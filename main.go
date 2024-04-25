package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Artisan struct {
	Name     string `json:"name"`
	Location string `json:"location"`
	// Add more artisan attributes as needed
}

type Product struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	// Add more product attributes as needed
}

type Repository struct {
	DB *gorm.DB
}

func (r *Repository) CreateArtisan(context *fiber.Ctx) error {
	artisan := Artisan{}
	err := context.BodyParser(&artisan)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(&fiber.Map{"message": "request failed"})
		return err
	}

	err = r.DB.Create(&artisan).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "artisan creation failed"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"message": "artisan has been added"})
	return nil
}

// Add methods for managing products, artisan profiles, etc. as needed

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/create_artisan", r.CreateArtisan)
	// Add more routes for managing artisans, products, etc.
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_PASS"),
		os.Getenv("DB_NAME"), os.Getenv("DB_PORT"), os.Getenv("DB_SSLMODE"))

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("could not connect to database:", err)
	}

	err = db.AutoMigrate(&Artisan{}, &Product{}) // Auto-migrate your models
	if err != nil {
		log.Fatal("could not migrate database:", err)
	}

	r := Repository{DB: db}

	app := fiber.New()
	r.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified in .env
	}

	app.Listen(":" + port)
}
