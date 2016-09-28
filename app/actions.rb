require "sinatra/json"
require "pry"
# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/contacts/' do
  Contact.all.to_json
end

get '/api/search/' do
  term = params[:searchQuery]
  @contacts = Contact.where("first_name LIKE? OR last_name LIKE? OR email LIKE? OR phone_number LIKE?", "%#{term}%", "%#{term}%", "%#{term}%", "%#{term}%")
  @contacts.to_json
end

post '/api/new/' do
  newUser = JSON.parse(request.body.read)
  first_name = newUser.values[0]
  last_name = newUser.values[1]
  email = newUser.values[2]
  phone_number = newUser.values[3]
  binding.pry

  @contact = Contact.new(first_name: first_name, last_name: last_name, email: email, phone_number:phone_number)
  @contact.save
  @contact.to_json
end

post '/api/delete/' do
  info = params[:param]
  @contact = Contact.where("email LIKE?", "%#{info}%")
  @name = @contact[0]
  @contact[0].destroy
  @name.to_json
end

