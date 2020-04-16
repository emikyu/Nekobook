class AddHiddenFriendsToNekos < ActiveRecord::Migration[5.2]
  def change
    add_column :nekos, :hidden_friends, :integer, array: true, default: []
  end
end
