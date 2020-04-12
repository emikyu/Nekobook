class CreateFriends < ActiveRecord::Migration[5.2]
  def change
    create_table :friendships do |t|
      t.integer :friend_one_id, null: false
      t.integer :friend_two_id, null: false

      t.timestamps
    end

    add_index :friendships, :friend_one_id
    add_index :friendships, :friend_two_id
    add_index :friendships, [:friend_one_id, :friend_two_id], unique: true
  end
end
