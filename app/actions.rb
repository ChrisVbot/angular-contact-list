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
  @contact = Contact.new(first_name: first_name, last_name: last_name, email: email, phone_number:phone_number)
  if 
    @contact.save
    @contact.to_json
  end
end

post '/api/delete/' do
  userId = JSON.parse(request.body.read)
  id = userId.values[0]
  @contact = Contact.where("id LIKE?", "#{id}")
  # @name = @contact[0]
  if 
    @contact[0].destroy
    response.status = 200
  # @name.to_json
  end
end

