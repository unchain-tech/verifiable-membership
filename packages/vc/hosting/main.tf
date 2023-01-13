variable "project" {}
variable "bucket_name" {}
variable "bucket_location" {}

provider "google" {
  project = var.project
}

resource "google_storage_bucket" "my_bucket" {
  name                        = var.bucket_name
  location                    = var.bucket_location
  force_destroy               = true

  cors {
    origin          = ["*"]
    method          = ["GET"]
    response_header = ["Content-Type"]
    max_age_seconds = 30
  }
}

resource "google_storage_bucket_iam_binding" "public_rule" {
  bucket = google_storage_bucket.my_bucket.name
  role = "roles/storage.legacyObjectReader"
  members = [
    "allUsers",
  ]
}

resource "google_storage_bucket_object" "did" {
  bucket = google_storage_bucket.my_bucket.name
  name   = ".well-known/did.json"
  source = "did.json"
  cache_control = "public, max-age=30"
}

resource "google_storage_bucket_object" "profile" {
  bucket = google_storage_bucket.my_bucket.name
  name   = "profile.json"
  source = "profile.json"
  cache_control = "public, max-age=30"
}