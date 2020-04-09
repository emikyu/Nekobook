class RemovePhotoColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :nekos, :profile_picture
    remove_column :nekos, :cover_photo
  end
end
