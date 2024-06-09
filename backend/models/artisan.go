package models

import "gorm.io/gorm"

type Artisans struct {
	ID       uint       `gorm:"primaryKey;autoIncrement" json:"id"`
	Name     *string    `json:"name"`
	Email    *string    `json:"email"`
	Picture  *string    `json:"picture"`
	Location *string    `json:"location"`
	Products []Products `json:"products" gorm:"foreignKey:ArtisanID"`
}

type Products struct {
	ID          uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	Name        *string `json:"name"`
	Description *string `json:"description"`
	Price       float64 `json:"price"`
	ArtisanID   uint    `json:"artisan_id"`
}

func MigrateArtisans(db *gorm.DB) error {
	return db.AutoMigrate(&Artisans{})
}

func MigrateProducts(db *gorm.DB) error {
	return db.AutoMigrate(&Products{})
}
