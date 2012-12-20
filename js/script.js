/**
 *
 * Slide Transformer 1.0
 * http://www.sigmald.com/experimentos/Slide-Transformer/index.html
 * MIT License
 *
 * Copyright (C) 2012 Luiz Felipe / Danilo Teixeira, http://www.sigmald.com
 * 
 * best view in Google Chrome
 *
 */

function elementTransform(target){
	
	/**
	 * Cria menu automaticamente
	 */
	var titulos = [].slice.call(document.getElementsByClassName("title-slide"));

	titulos.forEach(function(element, i){
		var li = document.createElement("li");
		li.innerHTML = element.innerHTML;
		document.getElementById("intMenu").appendChild(li);
	});


	var itens = document.getElementById(target).children,
			menu = document.getElementById("intMenu"),
			menuItem = [].slice.call(menu.children),
			elements = itens.length,
			toggle,
			direction = true,
			styles = ["rotateToBack","rotateToFront","falling","scaleToBack","moveToTop","moveToBottom","moveToRight"],
			styleTarget = window.location.search.substr(1) || "", // Escolha um dos styles acima ou deixe uma string vazia para o modo aleatório
			list = [].slice.call(itens),
			enable = true,
			index = 0,
			indexMenu,
			lastIndex;


	/** 
	 * Aplica ao elemento atual visibilidade e atribui a ele uma class padrão
	 * @param settings atribui invisibilidade ao elemento anterior
	 */
	function setCurrent( settings ){
		menuItem[index].classList.add( "current" );
		itens[index].style.display = "block";

		setTimeout(function(){
			list.forEach(function( element, i ){
				if(element.classList.contains(styles[ settings ])){
					element.setAttribute( "class", "" );
					element.style.display = "none";
					
					menu.children[i].classList.remove( "current" );
				}
			});

			itens[index].classList.add( "defaultShow" );

		},900);
	}
	setCurrent();

	/** 
	 * Define qual elemento deve desaparecer
	 * @param settings contém a class com o efeito de fechamento adequado
	 */
	function setPrev( settings ){
		if( direction ){
			if(index > 0 ){
				itens[ index-1 ].classList.add(styles[ settings ]);
			}
			else if( index === 0 ){
				itens[ elements-1 ].classList.add(styles[ settings ]);
			}
		}
		else{
			if( index < elements-1 ){
				itens[ index+1 ].classList.add(styles[ settings ]);
			}
			else if( index === elements-1 ){
				itens[0].classList.add(styles[ settings ]);
			}	
		}
	}

	
	/**
	 * @return indiceTarget retorna entre um valor padrão ou aleatório para o efeito de fechamento
	 */
	function efect(){
		var typeStyle = Math.round(Math.random()*(styles.length-1)),
						indice = styles.indexOf( styleTarget ),
						indiceTarget = (indice >= 0 && indice < styles.length)? indice : typeStyle;
						return indiceTarget;
	}

	/**
	 * Chama as funções que definem quais elementos devem ser configurados e como devem ser as configurações
	 * setStyle escolhe entre aleatório ou padrão o efeito de fechamento do elemento
	 */
	function callback(){
		setStyle = efect();

		setCurrent( setStyle );
		setPrev( setStyle );
	}

	function setIndex(){
		if(elements > 1){
			if(direction){
				index++;
				index = ( index > elements-1 )? 0 : index;
			}
			else{
				index--;
				index = ( index < 0 )? elements-1 : index;	
			}
		}
		else{
			return false;
		}
		callback();
	}

	function init( event ){
		if(event.keyCode == 39){
			direction = true;
			setIndex();
			clearInterval( toogle );
		}
		else if(event.keyCode == 37){
			direction = false;
			setIndex();
			clearInterval( toogle );
		}
	}

	/**
	 * Implementa a navegação pelos slides utilizando o menu lateral
	 */
	function clique( event ){
		index = menuItem.indexOf( event.target );
		list[index].style.display = "block";

		menuItem.forEach(function( element, i ){
			if(element.classList.contains("current")){
				list[i].classList.add(styles[efect()]);
				element.classList.remove("current");
				lastIndex = i;
			}
		});

		menuItem[index].classList.add("current");

		setTimeout(function(){
			list[lastIndex].setAttribute( "class", "" );
			list[lastIndex].style.display = "none";
			list[index].classList.add( "defaultShow" );
		},900);
		clearInterval( toogle );
	}

	if(enable && elements > 1){
		toogle = setInterval(function(){
					setIndex();
				},6000);
	}

	document.addEventListener("keyup", init, false);
	menuItem.forEach(function( element, i ){
		element.addEventListener("click", clique, false);
	});
};