 /* 
Creation by diegrosan
Uma forma que encontrei de verificar os bezels personalizados e valida.
One way I found to check custom bezels is valid.

Muito importante para o funcionamento da bezels, background pré-configurado.
Very important for the operation of bezels, preconfigured background. 

<style>
            .ejs_canvas {
                background-size: contain;
                background-position: center center; 
                background-repeat: no-repeat;

            }

        </style>
*/


        async function verificarURL(url) {
            try {
                const response = await fetch(url);
                
                if (response.ok) {
                return 0; 
                } else {
                return 1;
                }
            } catch (error) {
                return 2; 
            }
        }

        function bazelsLoader() {
                //A busca da classe para implementar o bezels.
                //The search for the class to implement bezels.  
                var bazelsElement = document.querySelector('.ejs_canvas');
                var ejsCoreValue = window.EJS_core;
                var ejsgameName = window.EJS_gameName;
                //é normal dar erro toLocaleUpperCase() ate carregar o classe ejs_canvas em breve será corrigido
                if(bazelsElement !== null){
                    var stringCore = window.EJS_core.toLocaleUpperCase();
                }

                //aqui buscar a capa do github bezelproject https://github.com/thebezelproject samos grados pela disponilidade dos bezels no github.
                //here get the bezelproject github cover https://github.com/thebezelproject We are grateful for the availability of bezels on github.


                    var imageUrl = "https://raw.githubusercontent.com/thebezelproject/bezelproject-" + stringCore + "/master/retroarch/overlay/GameBezels/" + stringCore + "/" + encodeURIComponent(ejsgameName) + ".png";

                             
                    if (bazelsElement) {
                        //O Bezels para funcionar, mas o jogo fica na frente do Bezels no caso do N64, precisa corrigir ainda, nos demais quais eu teste estão tudo ok.
                        //The Bezels to work, but the game is in front of the Bezels in the case of the N64, it still needs to be corrected, in the others that I test everything is ok.
                        if (ejsCoreValue === 'n64') { 
                        //Foi feito uma condição caso se não for encontrado o bezels personalizado já existem um padrão e se ocorrer qualquer erro de requisição o console.log ira informar.
                        //A condition was made in case if the custom bezels is not found there is already a pattern and if any request error occurs the console.log will inform.
                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    //aqui buscar a capa do github bezelproject https://github.com/bezelproject
                                    //here get the bezelproject github cover https://github.com/bezelproject
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-N64/master/retroarch/overlay/Nintendo-64.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });
   
                        } else if (ejsCoreValue === 'gb') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-GBC/master/retroarch/overlay/Nintendo-Game-Boy-Color.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });

                        } else if (ejsCoreValue === 'gba') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelproject-GBA/master/retroarch/overlay/Nintendo-Game-Boy-Advance.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });

                        } else if (ejsCoreValue === 'nds') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-NDS/master/retroarch/overlay/Nintendo-DS.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });

                        } else if (ejsCoreValue === 'nes') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-NES/master/retroarch/overlay/Nintendo-Entertainment-System.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });

                        } else if (ejsCoreValue === 'snes') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundSize = "contain";
                                    bazelsElement.style.backgroundPosition = "center center";
                                    bazelsElement.style.backgroundRepeat = "no-repeat";
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";

                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundSize = "contain";
                                    bazelsElement.style.backgroundPosition = "center center";
                                    bazelsElement.style.backgroundRepeat = "no-repeat";
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-SNES/master/retroarch/overlay/Super-Nintendo-Entertainment-System.png')";

                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });

                        } else if (ejsCoreValue === 'psx') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-PSX/master/retroarch/overlay/Sony-PlayStation.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });

                        } else if (ejsCoreValue === 'vb') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-Virtualboy/master/retroarch/overlay/Nintendo-Virtual-Boy.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });

                        } else if (ejsCoreValue === 'segaMD') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-MegaDrive/master/retroarch/overlay/Sega-Mega-Drive.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });

                        } else if (ejsCoreValue === 'segaMS') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-MasterSystem/master/retroarch/overlay/Sega-Master-System.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });

                        } else if (ejsCoreValue === 'segaCD') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-SegaCD/master/retroarch/overlay/Sega-CD.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });

                        } else if (ejsCoreValue === 'lynx') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelproject-AtariLynx/master/retroarch/overlay/Atari-Lynx-Horizontal.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });


                        } else if (ejsCoreValue === 'sega32x') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-Sega32X/master/retroarch/overlay/Sega-32X.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });


                        } else if (ejsCoreValue === 'jaguar') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelproject-AtariJaguar/master/retroarch/overlay/Atari-Jaguar.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });


                        } else if (ejsCoreValue === 'segaGG') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelproject-GameGear/master/retroarch/overlay/Sega-Game-Gear.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });


                        } else if (ejsCoreValue === 'segaSaturn') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-Saturn/master/retroarch/overlay/Sega-Saturn.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });


                        } else if (ejsCoreValue === 'atari7800') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelprojectSA-Atari7800/master/retroarch/overlay/Atari-7800.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });


                        } else if (ejsCoreValue === 'atari2600') { 

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelproject-Atari2600/master/retroarch/overlay/Atari-2600.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });


                        } else if (ejsCoreValue === 'arcade' || ejsCoreValue === 'mame2003') { 
                            
                            var stringCore = "MAME";
                            var imageUrl = "https://raw.githubusercontent.com/thebezelproject/bezelproject-" + stringCore + "/master/retroarch/overlay/ArcadeBezels/" + encodeURIComponent(ejsgameName) + ".png";

                            verificarURL(imageUrl)
                            .then(resultado => {
                                if (resultado === 0) {
                                    bazelsElement.style.backgroundImage = "url('" + imageUrl + "')";
                                    clearInterval(verificarInterval); 
                                } else if (resultado === 1) {
                                    bazelsElement.style.backgroundImage = "url('https://raw.githubusercontent.com/thebezelproject/bezelproject-MAME/master/retroarch/overlay/MAME-Horizontal.png')";
                                    clearInterval(verificarInterval);
                                } else if (resultado === 2) {
                                    console.log('Erro na requisição.');
                                }
                            });


                        }
                    }
                }
                clearInterval(verificarInterval);
                var verificarInterval = setInterval(bazelsLoader, 500);
          
