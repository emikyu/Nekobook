class AddBirthdayToNekos < ActiveRecord::Migration[5.2]
  def change
    add_column :nekos, :birthday, :date, null: false
  end
end
