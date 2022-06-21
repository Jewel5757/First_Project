             /* Код для галереи */
$(document).ready(function () {
    /*Находим класс small и все ссылки а в нем*/
    $('.small a').click(function(e){ 
        /*  проверяем, не стоит ли уже выбранное изображение на главной*/
        if($('.big img').attr('src')!==$(this).attr('href')){
            /* Теперь по клику находим класс big и имадж в нем, прячем их, и устанавливаем имаджу другой атрибут
        (из  ссылки той картинки, по которой произошел клик) и фейдИном проявляем в течении 1 секунды */
        $('.big img').hide().attr('src', $(this).attr('href')).fadeIn(1000); 
        }
        
        e.preventDefault(); 
    });

    /* Эта функция для того, чтобы выбранное изображение немного затемнялось */
    $('.small a img').click(function() {
        $('.small a img').fadeTo(500,1).css({
                'border':'none'
        });
        $(this).fadeTo(500,0.6).css({
        'border':'1px solid white'
        });
    }); 

});


/*Код для инпута*/
function getFileParam() { 			
    try { 				
        let file = document.getElementById('uploaded-file1').files[0]; 		/*Поймали приложенный файл*/		
        /*функция для определения размера и имени файла*/
        if (file) { 					
            let fileSize = 0; 					
            
            if (file.size > 1024 * 1024) { 
                fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
            }else {
                fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
            }
                
            document.getElementById('file-name1').innerHTML = 'Файл: ' + file.name;
            document.getElementById('file-size1').innerHTML = 'Размер: ' + fileSize;
            

            if (/\.(jpe?g|bmp|gif|png)$/i.test(file.name)) {		
                let elPreview = document.getElementById('preview1');
                elPreview.innerHTML = '';
                let newImg = document.createElement('img');
                newImg.className = "preview-img";
                
                /*Функция для того, чтобы вывести размер прикрепляемого изображения*/
                if (typeof file.getAsDataURL=='function') {
                    if (file.getAsDataURL().substr(0,11)=='data:image/') {
                        newImg.onload=function() {
                            document.getElementById('file-name1').innerHTML+=' ('+newImg.naturalWidth+'x'+newImg.naturalHeight+' px)';
                        }
                        newImg.setAttribute('src',file.getAsDataURL());
                        elPreview.appendChild(newImg);								
                    }
                }else {
                    let reader = new FileReader();
                    reader.onloadend = function(evt) {
                        if (evt.target.readyState == FileReader.DONE) {
                            newImg.onload=function() {
                                document.getElementById('file-name1').innerHTML+=' ('+newImg.naturalWidth+'x'+newImg.naturalHeight+' px)';
                            }
                        
                            newImg.setAttribute('src', evt.target.result);
                            elPreview.appendChild(newImg);
                        }
                    };
                    
                    let blob;		
                    if (file.slice) {
                        blob = file.slice(0, file.size);
                    }else if (file.webkitSlice) {
                            blob = file.webkitSlice(0, file.size);
                        }else if (file.mozSlice) {
                            blob = file.mozSlice(0, file.size);
                        }
                    reader.readAsDataURL(blob);
                }
            }
        }
    }catch(e) {
        let file = document.getElementById('uploaded-file1').value;
        file = file.replace(/\\/g, "/").split('/').pop();
        document.getElementById('file-name1').innerHTML = 'Имя: ' + file;
    }
}