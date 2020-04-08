class AddFirstAndLastNamesToNekos < ActiveRecord::Migration[5.2]
  def change
    rename_column :nekos, :name, :fname
    change_column :nekos, :username, :string, null: true
    add_column :nekos, :lname, :string, null: false
  end
end
