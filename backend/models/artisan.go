package models

import "gorm.io/gorm"

type Artisans struct {
	ID       uint    `gorm:"primary key;autoIncrement" json:"id"`
	Name     *string `json:"name"`
	Location *string `json:"location"`
	// Add more artisan attributes as needed
}

type Products struct {
	ID          uint    `gorm:"primary key;autoIncrement" json:"id"`
	Name        *string `json:"name"`
	Description *string `json:"description"`
	Price       float64 `json:"price"`
	// Add more product attributes as needed
}

func MigrateArtisans(db *gorm.DB) error {
	err := db.AutoMigrate(&Artisans{})
	return err
}

func MigrateProducts(db *gorm.DB) error {
	err := db.AutoMigrate(&Products{})
	return err
}
