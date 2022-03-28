# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

10.times do
    name = Faker::Creature::Cat.name
    breed = Faker::Creature::Cat.breed
    registry = Faker::Creature::Cat.registry
    avatar = Faker::Avatar.image(slug: name, size: '100x400', format: 'png', set: 'set4')
    Cat.create(name: name, breed: breed, registry: registry, avatar: avatar)
  end


u1 = User.create(email:'test1@test.com', password:123456, liked_cats:[1,2,3])
u2 = User.create(email:'test2@test.com', password:123456, liked_cats:[3,4,6])


  
