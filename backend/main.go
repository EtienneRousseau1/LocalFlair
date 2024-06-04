package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/gorm"

	"github.com/EtienneRousseau1/go-serverless/models"
	"github.com/EtienneRousseau1/go-serverless/storage"
)

type Artisans struct {
	Name     *string    `json:"name"`
	Location *string    `json:"location"`
	Products []Products `json:"products" gorm:"foreignKey:ArtisanID"`
}

type Products struct {
	Name        *string `json:"name"`
	Description *string `json:"description"`
	Price       float64 `json:"price"`
	ArtisanID   uint    `json:"artisan_id"`
}

type Repository struct {
	DB *gorm.DB
}

func (r *Repository) CreateArtisan(context *fiber.Ctx) error {
	artisan := models.Artisans{}
	err := context.BodyParser(&artisan)

	if err != nil {
		context.Status(fiber.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "request failed"})
		return err
	}

	err = r.DB.Create(&artisan).Error
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "artisan creation failed"})
		return err
	}

	context.Status(fiber.StatusOK).JSON(&fiber.Map{"message": "artisan has been added"})
	return nil
}

func (r *Repository) CreateProduct(context *fiber.Ctx) error {
	artisanID := context.Params("artisanID")
	if artisanID == "" {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "artisan ID cannot be empty"})
		return nil
	}

	product := models.Products{}
	err := context.BodyParser(&product)
	if err != nil {
		context.Status(fiber.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "request failed"})
		return err
	}

	// Convert artisanID to uint
	var id uint
	_, err = fmt.Sscanf(artisanID, "%d", &id)
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "invalid artisan ID"})
		return err
	}

	product.ArtisanID = id

	err = r.DB.Create(&product).Error
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "product creation failed"})
		return err
	}

	context.Status(fiber.StatusOK).JSON(&fiber.Map{"message": "product has been added"})
	return nil
}

func (r *Repository) GetProducts(context *fiber.Ctx) error {
	productModels := &[]models.Products{}

	err := r.DB.Find(productModels).Error
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "could not get products"})
		return err
	}

	context.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "products fetched successfully",
		"data":    productModels,
	})
	return nil
}

func (r *Repository) GetProductsByArtisan(context *fiber.Ctx) error {
	artisanID := context.Params("artisanID")
	if artisanID == "" {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "artisan ID cannot be empty"})
		return nil
	}

	products := []models.Products{}
	err := r.DB.Where("artisan_id = ?", artisanID).Find(&products).Error
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "could not get products"})
		return err
	}

	context.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "products fetched successfully",
		"data":    products,
	})
	return nil
}

func (r *Repository) DeleteProduct(context *fiber.Ctx) error {
	id := context.Params("id")
	productModel := models.Products{}
	if id == "" {
		context.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{"message": "id cannot be empty"})
		return nil
	}

	// Convert id to uint
	var productID uint
	_, err := fmt.Sscanf(id, "%d", &productID)
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "invalid product ID"})
		return err
	}

	err = r.DB.Delete(&productModel, productID).Error
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "could not delete product"})
		return err
	}

	context.Status(fiber.StatusOK).JSON(&fiber.Map{"message": "product has been deleted"})
	return nil
}

func (r *Repository) GetProductByID(context *fiber.Ctx) error {
	id := context.Params("id")
	productModel := &models.Products{}

	if id == "" {
		context.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{"message": "id cannot be empty"})
		return nil
	}

	fmt.Println("the ID is", id)

	// Convert id to uint
	var productID uint
	_, err := fmt.Sscanf(id, "%d", &productID)
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "invalid product ID"})
		return err
	}

	err = r.DB.Where("id = ?", productID).First(productModel).Error
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "could not get product"})
		return err
	}

	context.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "product fetched successfully",
		"data":    productModel,
	})
	return nil
}

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/artisans", r.CreateArtisan)                           // Create artisans
	api.Post("/artisans/:artisanID/products", r.CreateProduct)       // Create a product for a specific artisan
	api.Get("/artisans/:artisanID/products", r.GetProductsByArtisan) // Get products by artisan ID
	api.Delete("/products/:id", r.DeleteProduct)                     // Delete product
	api.Get("/products/:id", r.GetProductByID)                       // Get product by ID
	api.Get("/products", r.GetProducts)                              // Get all products
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASS"),
		DBName:   os.Getenv("DB_NAME"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
	}

	db, err := storage.NewConnection(config)
	if err != nil {
		log.Fatal("could not connect to database:", err)
	}

	err = models.MigrateArtisans(db)
	if err != nil {
		log.Fatal("could not migrate artisans:", err)
	}

	err = models.MigrateProducts(db)
	if err != nil {
		log.Fatal("could not migrate products:", err)
	}

	r := Repository{DB: db}

	app := fiber.New()
	r.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(app.Listen(":" + port))
}
