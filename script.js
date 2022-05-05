document.addEventListener("DOMContentLoaded", () => {
	
	const root = document.body

	let cursorPosition = null,
		isCapsLock = false



	const textArea = document.createElement("textarea")
	textArea.classList.add("text-area")
	root.appendChild(textArea)
	textArea.addEventListener("click", () => {
		cursorPosition = textArea.selectionStart
	})
	const keyboard = document.createElement("div")
	keyboard.classList.add("keyboard")
	root.appendChild(keyboard)

	class Btn {
		constructor(btn, shiftBtn, btnRu, shiftBtnRu, type, attribute) {
			this.lang = "en"
			this.btn = btn
			this.shiftBtn = shiftBtn
			this.btnRu = btnRu
			this.shiftBtnRu = shiftBtnRu
			this.type = type
			this.attribute = attribute
		}
		
	}
	
	class KeyBoard {
		constructor() {
			this.btns = [],
			this.lang = ""
		}
		addBtn(btn) {
			this.btns.push(btn)
		}

		initKeyboard(lang) {
			sessionStorage.setItem("lang", lang)
			this.lang = lang
			keyboard.innerHTML = lang === "ru" ? "<div class='lang'> <div>Текущий язык - Русский, чтобы изменить язык нажмите</div> <div class='key-btn'>SHIFT</div><div class='key-btn'>ALT</div> <div class='change-lang'><p class='lang-text'>Или нажмите на эту кнопку </p><button class='key-btn change-lang-btn special'>En</button></div></div>" : "<div class='lang'> <div>Current language - English, to change current language press</div><div class='key-btn'>SHIFT</div><div class='key-btn'>ALT</div><div class='change-lang'><p class='lang-text'>Or press this button </p><button class='key-btn change-lang-btn special'>RU</button></div></div>"
			k.btns.forEach(btn => {
				let attr = `data-btn=${btn.attribute ? btn.attribute : (lang === "ru" ? btn.btnRu : btn.btn)}`
				keyboard.insertAdjacentHTML("beforeend",`
					<button class="key-btn ${btn.type ? btn.type : ""}" ${attr ? attr : ""}>
						${lang === "ru" ? btn.btnRu : btn.btn}
						${btn.shiftBtn ? `<span class="extra-number">${lang === "ru" && btn.shiftBtnRu ? btn.shiftBtnRu : btn.shiftBtn}</span>` : ""}
					</button>
				`)
			})
		}
		destroyKeyboard() {
			keyboard.innerHTML = ""
		}

		changeLang() {
			this.destroyKeyboard()
			if(this.lang === "ru") {
				this.initKeyboard("en")
			} else {
				this.initKeyboard("ru")
			}
		}
	}

	let k = new KeyBoard()

	k.addBtn(new Btn("`", "~", "ё", "", "only-ru-letter"))
	k.addBtn(new Btn("1", "!", "1"))
	k.addBtn(new Btn("2", "@", "2", "\""))
	k.addBtn(new Btn("3", "#", "3", "№"))
	k.addBtn(new Btn("4", "$", "4", ";"))
	k.addBtn(new Btn("5", "%", "5"))
	k.addBtn(new Btn("6", "^", "6", ":"))
	k.addBtn(new Btn("7", "&", "7", "?"))
	k.addBtn(new Btn("8", "*", "8"))
	k.addBtn(new Btn("9", "(", "9"))
	k.addBtn(new Btn("0", ")", "0"))
	
	k.addBtn(new Btn("-", "_", "-"))
	k.addBtn(new Btn("=", "+", "="))
	k.addBtn(new Btn("Backspace", null, "Backspace", null, "special", "backspace"))
	k.addBtn(new Btn("Tab ⇆", null, "Tab ⇆", null, "special", "tab"))


	k.addBtn(new Btn("q", "", "й", "", "letter"))
	k.addBtn(new Btn("w", "", "ц", "", "letter"))
	k.addBtn(new Btn("e", "", "у", "", "letter"))
	k.addBtn(new Btn("r", "", "к", "", "letter"))
	k.addBtn(new Btn("t", "", "е", "", "letter"))
	k.addBtn(new Btn("y", "", "н", "", "letter"))
	k.addBtn(new Btn("u", "", "г", "", "letter"))
	k.addBtn(new Btn("i", "", "ш", "", "letter"))
	k.addBtn(new Btn("o", "", "щ", "", "letter"))
	k.addBtn(new Btn("p", "", "з", "", "letter"))
	k.addBtn(new Btn("[", "{", "х", "", "only-ru-letter"))
	k.addBtn(new Btn("]", "}", "ъ", "", "only-ru-letter"))
	k.addBtn(new Btn("\\", "|", "\\", "/"))
	k.addBtn(new Btn("DEL", "", "DEL", "", "special", "delete"))
	k.addBtn(new Btn("Caps Lock", "", "Caps Lock", "", "special", "capslock"))

	k.addBtn(new Btn("a", "", "ф", "", "letter"))
	k.addBtn(new Btn("s", "", "ы", "", "letter"))
	k.addBtn(new Btn("d", "", "в", "", "letter"))
	k.addBtn(new Btn("f", "", "а", "", "letter"))
	k.addBtn(new Btn("g", "", "п", "", "letter"))
	k.addBtn(new Btn("h", "", "р", "", "letter"))
	k.addBtn(new Btn("j", "", "о", "", "letter"))
	k.addBtn(new Btn("k", "", "л", "", "letter"))
	k.addBtn(new Btn("l", "", "д", "", "letter"))
	k.addBtn(new Btn(";", ":", "ж", "", "only-ru-letter"))

	k.addBtn(new Btn("&apos;", "&quot;", "э", "", "only-ru-letter"))
	k.addBtn(new Btn("Enter ↲", "", "Enter ↲", "", "special", "enter"))
	k.addBtn(new Btn("Shift", "", "Shift", "", "special", "shift"))

	k.addBtn(new Btn("z", "", "я", "", "letter"))
	k.addBtn(new Btn("x", "", "ч", "", "letter"))
	k.addBtn(new Btn("c", "", "с", "", "letter"))
	k.addBtn(new Btn("v", "", "м", "", "letter"))
	k.addBtn(new Btn("b", "", "и", "", "letter"))
	k.addBtn(new Btn("n", "", "т", "", "letter"))
	k.addBtn(new Btn("m", "", "ь", "", "letter"))
	k.addBtn(new Btn(",", "<", "б", "", "only-ru-letter"))
	k.addBtn(new Btn(".", ">", "ю", "", "only-ru-letter"))
	k.addBtn(new Btn("/", "?", ".", ","))
	k.addBtn(new Btn("↑", "", "↑", "", "special", "arrowup"))
	k.addBtn(new Btn("Shift", "", "Shift", "", "special", "shift"))


	k.addBtn(new Btn("Ctrl", "", "Ctrl", "", "special", "control"))
	k.addBtn(new Btn("Win", "", "Win", "", "special", "os"))
	k.addBtn(new Btn("Alt", "", "Alt", "", "special", "alt"))
	k.addBtn(new Btn("", "", "", "", "special space", "space"))
	k.addBtn(new Btn("Alt", "", "Alt", "", "special", "alt"))
	k.addBtn(new Btn("Ctrl", "", "Ctrl", "", "special", "control"))
	k.addBtn(new Btn("←", "", "←", "","special", "arrowleft"))
	k.addBtn(new Btn("↓", "", "↓", "","special", "arrowdown"))
	k.addBtn(new Btn("→", "", "→", "","special", "arrowright"))




	let pressedBtns = []

	document.addEventListener("keydown", (e) => {
		textArea.focus()
		pressedBtns.push(e.key)

		if(e.key === "Tab") {
			e.preventDefault()
			textArea.focus()
			addLetter("\t")
		}

		const btns = document.querySelectorAll(".key-btn")
		if(btns[0]) {
			btns.forEach(item => {
				if(item.getAttribute("data-btn") == e.key.toLowerCase()) {
					item.classList.add("press")
				}
				if(item.getAttribute("data-btn") === "space" && e.keyCode == 32) {
					item.classList.add("press")
				}
				
			})
		}
	})
	document.addEventListener("keyup", (e) => {
		cursorPosition = textArea.selectionStart
		if(pressedBtns.length === 2 && pressedBtns.some(item => item === "Shift") && pressedBtns.some(item => item === "Alt")) {
			k.changeLang()
		}
		pressedBtns = pressedBtns.filter(item => {
			if(e.key != item) {
				return item
			}
		})

		const btns = document.querySelectorAll(".key-btn")
		if(btns[0]) {
			btns.forEach(item => {
				if(!pressedBtns.some(btn => btn == item.getAttribute("data-btn"))) {
					item.classList.remove("press")
				}
				
			})
		}
	})

	function addLetter(l) {
		let newL = isCapsLock ? l.toUpperCase() : l
		if(cursorPosition !== 0) {
			textArea.value = textArea.value.slice(0, cursorPosition) + newL + textArea.value.slice(cursorPosition, textArea.value.length)
		} else {
			textArea.value += newL
		}
		textArea.focus()
		cursorPosition +=1
		textArea.setSelectionRange(cursorPosition, cursorPosition, "forward")
	}

	function removeLetter(pos) {
		textArea.focus()
		if(pos === "prev") {
			if(cursorPosition === null) {
				textArea.value = textArea.value.substring(0, textArea.value.length - 1)
			} else {
				cursorPosition -=1 
				textArea.value = textArea.value.slice(0, cursorPosition) + textArea.value.slice(cursorPosition +1, textArea.value.length)
			}
		} else if (pos === "next") {
			if(cursorPosition === null) {
				textArea.value = textArea.value.substring(0, textArea.value.length)
			} else {
				textArea.value = textArea.value.slice(0, cursorPosition) + textArea.value.slice(cursorPosition +1, textArea.value.length)
			}
		}
		textArea.setSelectionRange(cursorPosition, cursorPosition, "forward")
	}
	let start = ""
	document.addEventListener("click", e => {
		if(e.target.classList.contains("key-btn")) {
			if(!e.target.classList.contains("special")) {
				if(pressedBtns.some(item => item === "Shift")) {
					if(e.target.querySelector(".extra-number")) {
						addLetter(e.target.querySelector(".extra-number").textContent)
					} else {
						addLetter(e.target.getAttribute("data-btn").toUpperCase())
					}
				} else {
					addLetter(e.target.getAttribute("data-btn"))
				}
			} 
			if(e.target.getAttribute("data-btn") === "backspace") {
				if(textArea.selectionStart !== textArea.selectionEnd) {
					textArea.focus()
					let text = textArea.value.slice(0, textArea.selectionStart) + textArea.value.slice(textArea.selectionEnd, textArea.value.length)
					textArea.value = text
				} else {
					removeLetter("prev")
				}
			}
			if(e.target.getAttribute("data-btn") === "delete") {
				if(textArea.selectionStart !== textArea.selectionEnd) {
					textArea.focus()
					let text = textArea.value.slice(0, textArea.selectionStart) + textArea.value.slice(textArea.selectionEnd, textArea.value.length)
					textArea.value = text
				} else {
					removeLetter("next")
				}
			}
			if(e.target.getAttribute("data-btn") === "enter") {
				addLetter("\n")

			}
			if(e.target.getAttribute("data-btn") === "arrowleft") {
				textArea.focus()
				if(pressedBtns.some(item => item === "Shift") && !start) {
					start = cursorPosition
				}
				if(cursorPosition === null) {
					cursorPosition = textArea.value.length - 1
				} else {
					cursorPosition -= 1
				}
				if(pressedBtns.some(item => item === "Shift")) {

					if(start < cursorPosition) {
						textArea.setSelectionRange(start, cursorPosition, "backward")
					} else {
						textArea.setSelectionRange(cursorPosition, start, "backward")
					}
				} else {
					start = ""
					textArea.setSelectionRange(cursorPosition, cursorPosition, "backward")
				}
				
			}
			if(e.target.getAttribute("data-btn") === "arrowright") {
				textArea.focus()
				if(pressedBtns.some(item => item === "Shift") && !start) {
					start = cursorPosition
				}
				
				if(cursorPosition === null) {
					cursorPosition = textArea.value.length
				} else {
					cursorPosition += 1
				}
				if(pressedBtns.some(item => item === "Shift")) {
					if(start < cursorPosition) {
						textArea.setSelectionRange(start, cursorPosition, "forward")
					} else {
						textArea.setSelectionRange(cursorPosition, start, "forward")
					}
				} else {
					start = ""
					textArea.setSelectionRange(cursorPosition, cursorPosition, "forward")
				}
			}

			if(e.target.getAttribute("data-btn") === "arrowup") {
				textArea.focus()
				if(pressedBtns.some(item => item === "Shift") && !start) {
					start = cursorPosition
				}

				if(cursorPosition === null) {
					cursorPosition = textArea.value.length
				} else {
					let total = 0
					let textArr = textArea.value.split("\n")
					for(let i = 0; i < textArr.length; i++) {
						if(total === 0 && cursorPosition < textArr[i].length ) {
							break
						}else {
							if(i === 0) {
								total += textArr[i].length
							} else {
								total += textArr[i].length + 1
							}
							if(cursorPosition - 1 < total ) {
								if(textArr[i - 1]) {
									let thisLength = textArr[i].length
									let pos = cursorPosition - total + thisLength
									let newPos = cursorPosition - pos - textArr[i - 1].length + 1
									cursorPosition = newPos

									if(pressedBtns.some(item => item === "Shift")) {

										if(start < cursorPosition) {
											textArea.setSelectionRange(start, cursorPosition, "backward")
										} else {
											textArea.setSelectionRange(cursorPosition, start, "backward")
										}
									} else {
										start = ""
										textArea.setSelectionRange(cursorPosition, cursorPosition, "forward")
									}
								}
								break
							}
						}
					}
				}				
			}
			if(e.target.getAttribute("data-btn") === "arrowdown") {
				textArea.focus()
				if(pressedBtns.some(item => item === "Shift") && !start) {
					start = cursorPosition
				}

				if(cursorPosition === null) {
					cursorPosition = textArea.value.length
				} else {
					let total = 0
					let textArr = textArea.value.split("\n")
					for(let i = 0; i < textArr.length; i++) {
						if(total >= textArea.value.length && cursorPosition < textArr[i].length ) {
							break
						}else {
							if(i === 0) {
								total += textArr[i].length
							} else {
								total += textArr[i].length + 1
							}
							if(cursorPosition - 1 < total ) {
								if(textArr[i + 1]) {
									// let thisLength = textArr[i].length
									let newPos = cursorPosition + textArr[i + 1].length + 1
									cursorPosition = newPos
									if(pressedBtns.some(item => item === "Shift")) {
										if(start < cursorPosition) {
											textArea.setSelectionRange(start, cursorPosition, "backward")
										} else {
											textArea.setSelectionRange(cursorPosition, start, "backward")
										}
									} else {
										start = ""
										textArea.setSelectionRange(cursorPosition, cursorPosition, "forward")
									}
								}
								break
							}
						}
					}
				}				
			}
			if(e.target.getAttribute("data-btn") === "tab") {
				textArea.focus()
				addLetter("\t")
			}
			if(e.target.getAttribute("data-btn") === "space") {
				textArea.focus()
				addLetter(" ")
			}
			if(e.target.getAttribute("data-btn") === "capslock") {
				isCapsLock = isCapsLock ? false : true
				if(isCapsLock) {
					e.target.classList.add("caps-lock")
				} else {
					e.target.classList.remove("caps-lock")
				}
			}
		}
		if(e.target.parentElement && e.target.parentElement.classList.contains("key-btn")) {
			if(!e.target.parentElement.classList.contains("special")) {
				addLetter(e.target.parentElement.getAttribute("data-btn"))
			}
		}
		if(e.target.classList.contains("change-lang-btn")) {
			k.changeLang()
		}
	})
	if(sessionStorage.getItem("lang")) {
		k.initKeyboard(sessionStorage.getItem("lang"))
	} else {
		k.initKeyboard("ru")
	}
	
})