package models

import "gorm.io/gorm"

type Artisan struct {
	ID       uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	Name     *string `json:"name"`
	Location *string `json:"location"`
	// Add more artisan attributes as needed
}

type Product struct {
	ID          uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	Name        *string `json:"name"`
	Description *string `json:"description"`
	Price       float64 `json:"price"`
	// Add more product attributes as needed
}

func MigrateArtisans(db *gorm.DB) error {
	err := db.AutoMigrate(&Artisan{})
	return err
}

func MigrateProducts(db *gorm.DB) error {
	err := db.AutoMigrate(&Product{})
	return err
}
