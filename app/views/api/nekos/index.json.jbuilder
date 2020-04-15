@nekos.each do |neko|
    json.set! neko.id do
        if neko.id != current_user.id
            json.partial! '/api/nekos/neko', neko: neko
        else
            json.partial! '/api/nekos/neko_current', neko: neko
        end
    end
end

if @fofs
    @fofs.each do |neko|
        json.set! neko.id do
            if neko.id != current_user.id
                json.partial! '/api/nekos/neko', neko: neko
            else
                json.partial! '/api/nekos/neko_current', neko: neko
            end
        end
    end
end