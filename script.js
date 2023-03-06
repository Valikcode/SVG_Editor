window.onload=function(){

    // Constante din html
    const viewBox = document.getElementById('svg'),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    sizeSlider = document.querySelector('#size-slider'),
    clearCanvas = document.querySelector('.clear-canvas'),
    saveAsImg = document.querySelector('.save-img'),
    sizeLabel = document.querySelector('#size-slider-label');
    
    // SVG-ul selectat
    var selectedSVG = null;

    // Proprietate care verifica mouse-down
    let isDrawing=false;

    // Variabile globale
    let strokeWidth = sizeSlider.value,
    selectedColor = "#000",
    selectedTool = "rectangle",
    idInt = 0,
    initial_coords, current_coords;

    let startX,startY;

    // Functie pentru preluarea coordonatelor
    function screenToSVGCoords(viewBox, e){
        let viewBoxRect = viewBox.getBoundingClientRect();
        return{
            x: e.clientX - viewBoxRect.x,
            y: e.clientY - viewBoxRect.y
        }
    }    

    // Functie pentru RECT selectat (rectShadow)    
    const selectedRect = (e) =>{
        let x = Math.min(initial_coords.x , current_coords.x);
        let y = Math.min(initial_coords.y , current_coords.y);

        let width = Math.abs(current_coords.x - initial_coords.x);
        let height = Math.abs(current_coords.y - initial_coords.y);

        selectedSVG.setAttributeNS(null, 'x', x);
        selectedSVG.setAttributeNS(null, 'y', y);
        selectedSVG.setAttributeNS(null, 'width', width);
        selectedSVG.setAttributeNS(null, 'height', height);
        selectedSVG.setAttributeNS(null, 'stroke', selectedColor);
        selectedSVG.setAttributeNS(null, 'style', 'stroke-width:1px;');

        if(!fillColor.checked){
            selectedSVG.setAttributeNS(null, 'style', 'fill: grey');
        }else{
            selectedSVG.setAttributeNS(null, 'fill',selectedColor);
            selectedSVG.setAttributeNS(null,'fill-opacity', 0.5 );
        }
    }
    
    // Functie pentru desenare RECT final
    const drawRect = (e) =>{
        rectangle = document.createElementNS("http://www.w3.org/2000/svg",'rect');
    
        let x = selectedSVG.getAttribute("x");
        let y = selectedSVG.getAttribute("y");
        let width = selectedSVG.getAttribute("width");
        let height = selectedSVG.getAttribute("height");
        
        rectangle.setAttributeNS(null, 'x', x);
        rectangle.setAttributeNS(null, 'y', y);
        rectangle.setAttributeNS(null, 'width', width);
        rectangle.setAttributeNS(null, 'height', height);
        rectangle.setAttributeNS(null, 'stroke', selectedColor);
        rectangle.setAttributeNS(null, 'stroke-width', strokeWidth);
        rectangle.setAttributeNS(null, 'id', idInt);
        rectangle.setAttributeNS(null, 'type', 'rect');        
        
        idInt++;
        
        if(!fillColor.checked){
            rectangle.setAttributeNS(null, 'style', 'fill: none');
        }else{
            rectangle.setAttributeNS(null, 'fill',selectedColor);
        }
        
        viewBox.appendChild(rectangle);
    }

    // Functie pentru ELLIPSE selectat (ellipseShadow)    
    const selectedEllipse = (e) =>{
        let rx = Math.abs(current_coords.x - initial_coords.x);
        let ry = Math.abs(current_coords.y - initial_coords.y);

        selectedSVG.setAttributeNS(null, 'cx', initial_coords.x + (current_coords.x - initial_coords.x)/2);
        selectedSVG.setAttributeNS(null, 'cy', initial_coords.y + (current_coords.y - initial_coords.y)/2);
        selectedSVG.setAttributeNS(null, 'rx', rx/2);
        selectedSVG.setAttributeNS(null, 'ry', ry/2);
        selectedSVG.setAttributeNS(null, 'stroke', selectedColor);
        selectedSVG.setAttributeNS(null, 'style', 'stroke-width:1px;');

         if(!fillColor.checked){
            selectedSVG.setAttributeNS(null, 'style', 'fill: grey');
        }else{
            selectedSVG.setAttributeNS(null, 'fill',selectedColor);
            selectedSVG.setAttributeNS(null,'fill-opacity', 0.5 );
        }
    }

    // Functie pentru desenare ELLIPSE final
    const drawEllipse = (e) => {
        var ellipse = document.createElementNS("http://www.w3.org/2000/svg",'ellipse');

        let rx = Math.abs(current_coords.x - initial_coords.x);
        let ry = Math.abs(current_coords.y - initial_coords.y);
        
        ellipse.setAttributeNS(null, 'cx', initial_coords.x + (current_coords.x - initial_coords.x)/2);
        ellipse.setAttributeNS(null, 'cy', initial_coords.y + (current_coords.y - initial_coords.y)/2);
        ellipse.setAttributeNS(null, 'rx', rx/2);
        ellipse.setAttributeNS(null, 'ry', ry/2);
        ellipse.setAttributeNS(null, 'stroke', selectedColor);
        ellipse.setAttributeNS(null, 'stroke-width', strokeWidth);
        ellipse.setAttributeNS(null, 'id', idInt);
        ellipse.setAttributeNS(null, 'type', 'ellipse');
        
        idInt++;
        
        if(!fillColor.checked){
            ellipse.setAttributeNS(null, 'style', 'fill: none');
        }else{
            ellipse.setAttributeNS(null, 'fill', selectedColor);
        }
        viewBox.appendChild(ellipse);
    }

    // Functie pentru LINE selectat (lineShadow)    
    const selectedLine = (e) => {
        if(initial_coords.x<current_coords.x)
        {
            selectedSVG.setAttributeNS(null, 'x1', initial_coords.x);
            selectedSVG.setAttributeNS(null, 'y1', initial_coords.y);
            selectedSVG.setAttributeNS(null, 'x2', current_coords.x);
            selectedSVG.setAttributeNS(null, 'y2', current_coords.y);
        }else{
            selectedSVG.setAttributeNS(null, 'x1', current_coords.x);
            selectedSVG.setAttributeNS(null, 'y1', current_coords.y);
            selectedSVG.setAttributeNS(null, 'x2', initial_coords.x);
            selectedSVG.setAttributeNS(null, 'y2', initial_coords.y);
        }
        selectedSVG.setAttributeNS(null, 'stroke', selectedColor);
        selectedSVG.setAttributeNS(null, 'style', 'fill: none; stroke-width:1px;');
    }
    

    // Functie pentru desenare LINE final
    const drawLine = (e) => {
        var line = document.createElementNS("http://www.w3.org/2000/svg",'line');

        if(initial_coords.x<current_coords.x)
        {
            line.setAttributeNS(null, 'x1', initial_coords.x);
            line.setAttributeNS(null, 'y1', initial_coords.y);
            line.setAttributeNS(null, 'x2', current_coords.x);
            line.setAttributeNS(null, 'y2', current_coords.y);
        }else{
            line.setAttributeNS(null, 'x1', current_coords.x);
            line.setAttributeNS(null, 'y1', current_coords.y);
            line.setAttributeNS(null, 'x2', initial_coords.x);
            line.setAttributeNS(null, 'y2', initial_coords.y);
        }
        
        line.setAttributeNS(null, 'stroke', selectedColor);
        line.setAttributeNS(null, 'style', 'fill: none');
        line.setAttributeNS(null, 'stroke-width', strokeWidth);
        line.setAttributeNS(null, 'id',idInt);
        line.setAttributeNS(null, 'type', 'line');
        
        idInt++;
        
        viewBox.appendChild(line);
    }
      

    // Functie de incepere desenare (MOUSEDOWN)
    const startDraw = (e) => {
        isDrawing=true;

        initial_coords = screenToSVGCoords(viewBox,e);
        
        viewBox.addEventListener("mousemove",drawing);
        viewBox.addEventListener("mouseup", endDraw);

        if(selectedTool === "rectangle"){
            selectedSVG = document.getElementById("rect-selector");
        }else if(selectedTool === "ellipse"){
            selectedSVG = document.getElementById("ellipse-selector");
        }else if(selectedTool === "line"){
            selectedSVG = document.getElementById("line-selector");
        }else if(selectedTool === "hand"){
            selectedSVG = e.target;
            console.log(selectedSVG);
            if(selectedSVG.getAttribute('type')==="rect"){
                startX=parseInt(selectedSVG.getAttribute('x'));
                startY=parseInt(selectedSVG.getAttribute('y'));
            } else if(selectedSVG.getAttribute('type')==="ellipse"){
                startX=parseInt(selectedSVG.getAttribute('cx'));
                startY=parseInt(selectedSVG.getAttribute('cy'));
            } else if(selectedSVG.getAttribute('type')==="line"){
                startX1=parseInt(selectedSVG.getAttribute('x1'));
                startY1=parseInt(selectedSVG.getAttribute('y1'));
                startX2=parseInt(selectedSVG.getAttribute('x2'));
                startY2=parseInt(selectedSVG.getAttribute('y2'));
            }
        }else if(selectedTool === "eraser"){
            selectedSVG = e.target;
            console.log(selectedSVG);
            if(selectedSVG.getAttribute('type') === 'rect' || selectedSVG.getAttribute('type') === 'ellipse' || selectedSVG.getAttribute('type') === 'line')
            viewBox.removeChild(selectedSVG);
        }
        
    }
    
    // Functie de desenare (MOUSEMOVE)
    const drawing = (e) =>{
        if(!isDrawing) return;

        current_coords = screenToSVGCoords(viewBox, e);

        if(selectedTool === "rectangle"){
            selectedRect(e);
            selectedSVG.setAttributeNS(null, 'display','block');
            viewBox.appendChild(selectedSVG);
        }else if(selectedTool === "ellipse"){
            selectedEllipse(e);
            selectedSVG.setAttributeNS(null, 'display','block');
            viewBox.appendChild(selectedSVG);
        }else if(selectedTool === "line"){
            selectedLine(e);
            selectedSVG.setAttributeNS(null, 'display','block');
            viewBox.appendChild(selectedSVG);
        }else if(selectedTool === "hand"){
            if(selectedSVG.getAttribute('type')==="rect"){
                selectedSVG.setAttributeNS(null, 'x', startX + current_coords.x - initial_coords.x);
                selectedSVG.setAttributeNS(null, 'y', startY + current_coords.y - initial_coords.y);
            } else if(selectedSVG.getAttribute('type')==="line"){
                selectedSVG.setAttributeNS(null, 'x1', startX1 + current_coords.x - initial_coords.x);
                selectedSVG.setAttributeNS(null, 'y1', startY1 + current_coords.y - initial_coords.y);
                selectedSVG.setAttributeNS(null, 'x2', startX2 + current_coords.x - initial_coords.x);
                selectedSVG.setAttributeNS(null, 'y2', startY2 + current_coords.y - initial_coords.y);
            } else if(selectedSVG.getAttribute('type')==="ellipse"){
                selectedSVG.setAttributeNS(null, 'cx', startX + current_coords.x - initial_coords.x);
                selectedSVG.setAttributeNS(null, 'cy', startY + current_coords.y - initial_coords.y);
            }
        }
    }

    // Functie de terminare desen (MOUSEUP)
    const endDraw = (e) => {
        isDrawing = false;
        if(selectedTool === "rectangle"){
            drawRect(e);
            selectedSVG.setAttributeNS(null, 'display','none');
        }else if(selectedTool === "ellipse"){
            drawEllipse(e);
            selectedSVG.setAttributeNS(null, 'display','none');
        }else if(selectedTool === "line"){
            drawLine(e);
            selectedSVG.setAttributeNS(null, 'display','none');
        }
        
        viewBox.removeEventListener("mousemove",drawing);
        viewBox.removeEventListener("mouseup",endDraw);
    }

    // Handleri pentru fiecare buton
    toolBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".options .active").classList.remove("active");
            btn.classList.add("active");
            selectedTool = btn.id
            console.log(selectedTool);

            if(selectedTool === "line" || selectedTool === "ellipse" || selectedTool === "rectangle"){
                viewBox.setAttributeNS(null, 'cursor', 'crosshair');
            }else{
                viewBox.setAttributeNS(null, 'cursor', 'default');
            }

            // Handler pentru cursor hand/eraser
            for(let i=0;i<viewBox.childNodes.length;i++){
                if(viewBox.childNodes[i].nodeType === 1){
                    if(selectedTool === "hand"){
                        console.log(i);
                        console.log(viewBox.childNodes[i]);
                        viewBox.childNodes[i].setAttributeNS(null, 'cursor', 'move');
                    }else if(selectedTool === "eraser"){
                        console.log(i);
                        console.log(viewBox.childNodes[i]);
                        viewBox.childNodes[i].setAttributeNS(null, 'cursor', 'pointer');
                    }else{
                        console.log(i);
                        console.log(viewBox.childNodes[i]);
                        viewBox.childNodes[i].setAttributeNS(null, 'cursor', 'default');
                    }
                }
            }
        });
    });

    // Handleri pentru culoare
    colorBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".options .selected").classList.remove("selected");
            btn.classList.add("selected");
            selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
            console.log(window.getComputedStyle(btn).getPropertyValue("background-color"));
        });
    });

    // Handler pentru color picker
    colorPicker.addEventListener("change", () => {
        colorPicker.parentElement.style.background = colorPicker.value;
        colorPicker.parentElement.click();
    })

    // Handler pentru size slider
    sizeSlider.addEventListener("change",() => {
        strokeWidth = sizeSlider.value;
        sizeLabel.innerHTML = sizeSlider.value + "%";
    });

    // Handler pentru clear canvas
    clearCanvas.addEventListener("click",() => {
        for(let i=viewBox.childNodes.length-1;i>0;i--){
            if(viewBox.childNodes[i].nodeType === 1){
                if(viewBox.childNodes[i].getAttribute('type') === 'rect' || viewBox.childNodes[i].getAttribute('type') === 'ellipse' || viewBox.childNodes[i].getAttribute('type') === 'line'){
                    console.log(i);

                    viewBox.removeChild(viewBox.childNodes[i]); 
                }
            }
        }
    });

    // Handler pentru save image
    saveAsImg.addEventListener("click", () => {
       
    });

    //------------
    //var btn = document.querySelector('.save-img'); // saveAsImg
    //var svg = document.querySelector('svg'); // viewBox
    //var canvas = document.querySelector('canvas'); //

    
    function triggerDownload (imgURI) {
        var evt = new MouseEvent('click', {
            view: window,
            bubbles: false,
            cancelable: true
        });
        
        var a = document.createElement('a');
        a.setAttribute('download', 'MY_COOL_IMAGE.png');
        a.setAttribute('href', imgURI);
        a.setAttribute('target', '_blank');
        
        a.dispatchEvent(evt);
    }
    
    saveAsImg.addEventListener('click', function () {
        var canvas = document.createElement('canvas');
        canvas.id = "canvas";
        let viewBoxRect = viewBox.getBoundingClientRect();
        console.log(viewBoxRect.x,viewBoxRect.y)
        canvas.width = 810;
        canvas.height = 636;
        console.log(canvas.width,canvas.height);
        var ctx = canvas.getContext('2d');
        var data = (new XMLSerializer()).serializeToString(viewBox);
        var DOMURL = window.URL || window.webkitURL || window;
    
      var img = new Image();
      var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
      var url = DOMURL.createObjectURL(svgBlob);
    
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
    
        var imgURI = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
    
        triggerDownload(imgURI);
      };
    
      img.src = url;
    });
    //------------


    // Eventul de MOUSEDOWN care incepe functia de desenare (startDraw)
    viewBox.addEventListener("mousedown",startDraw);


    // Eventul care ne seteaza atributul la cursor la inceputul aplicatiei
    viewBox.setAttributeNS(null, 'cursor', 'crosshair');
}
