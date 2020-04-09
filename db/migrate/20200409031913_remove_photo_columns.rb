class RemovePhotoColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :nekos, :profile_picture, :string
    remove_column :nekos, :cover_photo, :string
  end
end
