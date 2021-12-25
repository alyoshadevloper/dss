const fs = require('fs')
const path = require('path')
const p = path.dirname(require.main.filename)

module.exports = (filePath) => {
    if (Array.isArray(filePath)) {
         filePath.forEach(element => {
             console.log(element);
            fs.unlink(p + '/../public/imgCard/' + element.filename, (err) => {
                if (err) {
                    console.log(err);
                }
            })
         });
     
    }else{
        fs.unlink(p + '/../public/imgCard/' + filePath, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}