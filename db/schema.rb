# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_17_034708) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.integer "author_id", null: false
    t.integer "post_id", null: false
    t.integer "parent_id"
    t.string "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_comments_on_author_id"
    t.index ["parent_id"], name: "index_comments_on_parent_id"
    t.index ["post_id"], name: "index_comments_on_post_id"
  end

  create_table "friend_requests", force: :cascade do |t|
    t.integer "requester_id", null: false
    t.integer "requestee_id", null: false
    t.string "request_message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["requestee_id"], name: "index_friend_requests_on_requestee_id"
    t.index ["requester_id", "requestee_id"], name: "index_friend_requests_on_requester_id_and_requestee_id", unique: true
    t.index ["requester_id"], name: "index_friend_requests_on_requester_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "friend_one_id", null: false
    t.integer "friend_two_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_one_id", "friend_two_id"], name: "index_friendships_on_friend_one_id_and_friend_two_id", unique: true
    t.index ["friend_one_id"], name: "index_friendships_on_friend_one_id"
    t.index ["friend_two_id"], name: "index_friendships_on_friend_two_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nekos", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "fname", null: false
    t.integer "location_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "birthday", null: false
    t.string "gender", null: false
    t.string "username"
    t.string "lname", null: false
    t.integer "hidden_friends", default: [], array: true
    t.string "bio"
    t.index ["email"], name: "index_nekos_on_email", unique: true
    t.index ["location_id"], name: "index_nekos_on_location_id"
    t.index ["session_token"], name: "index_nekos_on_session_token", unique: true
  end

  create_table "posts", force: :cascade do |t|
    t.integer "author_id", null: false
    t.string "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "wall_id", null: false
    t.index ["author_id"], name: "index_posts_on_author_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
