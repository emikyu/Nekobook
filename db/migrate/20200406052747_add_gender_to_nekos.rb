class AddGenderToNekos < ActiveRecord::Migration[5.2]
  def change
    add_column :nekos, :gender, :string, null: false
  end
end
