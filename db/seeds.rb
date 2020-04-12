# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Friendship.destroy_all
FriendRequest.destroy_all
Neko.destroy_all

demo_socks = Neko.create(fname: "Socks", lname: "Cat", email: "socks@greytabby.com", password: "password", birthday: "2018-03-28", gender: "Female")
lia = Neko.create(fname: "Lia", lname: "Cat", email: "lia@cyprus.com", password: "password", birthday: "2017-06-01", gender: "Female")
nisse = Neko.create(fname: "Nisse", lname: "Kitty", email: "nisse@nyaa.com", password: "password", birthday: "2005-05-25", gender: "Male")
emily = Neko.create(fname: "Emily", lname: "Wu", email: "emily@example.com", password: "password", birthday: "2000-11-12", gender: "Custom")

fr1 = FriendRequest.create(requester: demo_socks, requestee: lia)
fr2 = FriendRequest.create(requester: demo_socks, requestee: emily)
fr3 = FriendRequest.create(requester: emily, requestee: nisse)
fr4 = FriendRequest.create(requester: nisse, requestee: demo_socks)

# f1a = Friendship.create(friend_one: demo_socks, friend_two: emily)
# f1b = Friendship.create(friend_two: demo_socks, friend_one: emily)
# f2a = Friendship.create(friend_one: demo_socks, friend_two: nisse)
# f2b = Friendship.create(friend_two: demo_socks, friend_one: nisse)
# f3a = Friendship.create(friend_one: lia, friend_two: emily)
# f3b = Friendship.create(friend_two: lia, friend_one: emily)
# f4a = Friendship.create(friend_one: demo_socks, friend_two: lia)
# f4b = Friendship.create(friend_two: demo_socks, friend_one: lia)

