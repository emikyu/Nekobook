class CreateNekos < ActiveRecord::Migration[5.2]
  def change
    create_table :nekos do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :name, null: false
      t.string :profile_picture
      t.integer :location_id

      t.timestamps
    end

    add_index :nekos, :username, unique: true
    add_index :nekos, :email, unique: true
    add_index :nekos, :session_token, unique: true
    add_index :nekos, :location_id
  end
end
