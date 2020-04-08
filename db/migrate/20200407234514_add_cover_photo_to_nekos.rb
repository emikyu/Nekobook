class AddCoverPhotoToNekos < ActiveRecord::Migration[5.2]
  def change
    add_column :nekos, :cover_photo, :string
  end
end
