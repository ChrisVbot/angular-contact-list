require "sinatra/json"
# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/contacts/' do
  Contact.all.to_json
end

# get '/search/?' do
# work on filter in here
#  # erb :index
# end

# post '/new/?' do
#   # erb :index
# end

# get '/list/?' do
#   # erb :index
# end

# post '/delete/?' do
#   # erb :index
# end