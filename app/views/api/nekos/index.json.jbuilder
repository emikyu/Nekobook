@nekos.each do |neko|
    json.set! neko.id do
        json.partial! '/api/nekos/neko', neko: neko
    end
end