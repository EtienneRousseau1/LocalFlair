package main

import (
	"fmt"
	"log"
	"os"

	"github.com/EtienneRousseau1/go-serverless/models"
	"github.com/EtienneRousseau1/go-serverless/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

type Artisans struct {
	Name      *string    `json:"name"`
	Location  *string    `json:"location"`
	Email     *string    `json:"email"`
	Picture   *string    `json:"picture"`
	Biography *string    `json:"biography"`
	Products  []Products `json:"products" gorm:"foreignKey:ArtisanID"`
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

func (r *Repository) GetArtisanByID(context *fiber.Ctx) error {
	id := context.Params("id")
	if id == "" {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "artisan ID cannot be empty"})
		return nil
	}

	artisan := &models.Artisans{}

	// Convert id to uint
	var artisanID uint
	_, err := fmt.Sscanf(id, "%d", &artisanID)
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "invalid artisan ID"})
		return err
	}

	err = r.DB.Preload("Products").Where("id = ?", artisanID).First(artisan).Error
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "could not get artisan"})
		return err
	}

	context.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "artisan fetched successfully",
		"data":    artisan,
	})
	return nil
}

func (r *Repository) GetArtisans(context *fiber.Ctx) error {
	artisans := &[]models.Artisans{}

	err := r.DB.Preload("Products").Find(artisans).Error
	if err != nil {
		context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "could not get artisans"})
		return err
	}

	context.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "artisans fetched successfully",
		"data":    artisans,
	})
	return nil
}

func (r *Repository) LoginOrCreateArtisan(context *fiber.Ctx) error {
	var request struct {
		Email     string `json:"email"`
		Name      string `json:"name"`
		Location  string `json:"location"`
		Biography string `json:"biography"`
		Picture   string `json:"picture"`
	}

	if err := context.BodyParser(&request); err != nil {
		return context.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"message": "invalid request"})
	}

	var artisan models.Artisans
	if err := r.DB.Where("email = ?", request.Email).First(&artisan).Error; err != nil {
		// User not found, create a new artisan
		artisan = models.Artisans{
			Name:      &request.Name,
			Location:  &request.Location,
			Biography: &request.Biography,
			Email:     &request.Email,
			Picture:   &request.Picture,
		}
		if err := r.DB.Create(&artisan).Error; err != nil {
			return context.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{"message": "could not create artisan"})
		}
		return context.Status(fiber.StatusOK).JSON(&fiber.Map{"message": "artisan created", "data": artisan})
	}

	// User found, update artisan info
	artisan.Name = &request.Name
	artisan.Location = &request.Location
	artisan.Biography = &request.Biography
	artisan.Picture = &request.Picture
	if err := r.DB.Save(&artisan).Error; err != nil {
		return context.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{"message": "could not update artisan"})
	}

	return context.Status(fiber.StatusOK).JSON(&fiber.Map{"message": "artisan found", "data": artisan})
}
func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/login", r.LoginOrCreateArtisan)                       // Login or create artisan
	api.Post("/artisans", r.CreateArtisan)                           // Create artisans
	api.Post("/artisans/:artisanID/products", r.CreateProduct)       // Create a product for a specific artisan
	api.Get("/artisans/:artisanID/products", r.GetProductsByArtisan) // Get products by artisan ID
	api.Get("/artisans/:id", r.GetArtisanByID)                       // Get artisan by ID
	api.Get("/artisans", r.GetArtisans)                              // Get artisans
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
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Change this to restrict origins if needed
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	r.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(app.Listen(":" + port))
}
