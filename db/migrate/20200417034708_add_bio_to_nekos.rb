class AddBioToNekos < ActiveRecord::Migration[5.2]
  def change
    add_column :nekos, :bio, :string
  end
end
