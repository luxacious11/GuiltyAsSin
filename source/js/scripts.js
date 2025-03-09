/********** Global **********/
let pageType = document.querySelector('body').id;
let pageClasses = document.querySelector('body').classList;

//click to change subaccounts
document.querySelectorAll('#post_as_menu option').forEach(account => {
    account.innerHTML = account.innerHTML.replace(/&nbsp;&nbsp;»/g,'');
});
let switcher = document.querySelector('#account-switch #subaccounts_menu select');
if(switcher !== null) {
    document.querySelectorAll('select[name="sub_id"] option').forEach(account => {
        account.innerHTML = account.innerHTML.replace(/&nbsp;&nbsp;»/g,'');
    });
    initSwitcher();
}

//quick login
/*if(document.querySelector('body').classList.contains('g-2')) {
    initQuickLogin();
} else {
    if($('#quick-login').length) {
        $('#quick-login').remove();
    }
    $('#quick-login-clip').remove();
}*/

//remove empty tooltips
$('*[title=""]').removeAttr('title');
$('*[tooltip=""]').removeAttr('tooltip');
if (typeof tippy === 'function') {
    tippy(document.querySelectorAll('[title]'), {
        content: (reference) => {
	    function htmlDecode(input){
		var e = document.createElement('div');
		e.innerHTML = input;
		return e.childNodes[0].nodeValue;
	    }
	    if(!reference.querySelector('.macro--button')) {
                const title = reference.getAttribute('title');
                reference.removeAttribute('title');
		const stringified = JSON.stringify({title: title});
		
		if(reference.classList.contains('profile-link')) {
                    return capitalize(htmlDecode(title));
		} else {
                    return htmlDecode(title);
		}
	    }
        },
        theme: 'godlybehaviour',
        arrow: false
    });
}

window.addEventListener('scroll', () => {
    if(window.scrollY < window.innerHeight) {
        document.querySelectorAll('header').forEach(hero => applyBlur(hero));
    } else {
        document.querySelectorAll('header').forEach(hero => {
            hero.querySelector('.hero--static').style.opacity = 0;
            hero.querySelector('.hero--static').style.filter = `blur(50px)`;
        });
    }
});
function applyBlur(hero) {
    let percentScrolled = calcPercentScrolled(window.scrollY, hero.clientHeight);
    let blur = blurAmount(window.scrollY, hero.clientHeight);
    if(percentScrolled > 0) {
        hero.querySelector('.hero--static').style.opacity = percentScrolled;
        hero.querySelector('.hero--static').style.filter = `blur(${blur > 0 ? blur : 0}px)`;
    } else {
        hero.querySelector('.hero--static').style.opacity = 0;
        hero.querySelector('.hero--static').style.filter = `blur(50px)`;
    }
}
function calcPercentScrolled(scroll, height) {
    return ((height / 2) - scroll) / (height / 2) + 0.2;
}
function blurAmount(scroll, height) {
    return ((scroll / (height / 2)) - 0.2) * 50
}

/********** Initializations **********/
setTheme();
setSize();
initCopyLink();
//init clipboards
let clipboards = document.querySelectorAll('tag-code');
let codes = document.querySelectorAll(`table[id='CODE-WRAP']`);
if (clipboards.length > 0) {
    initClipboard();
}
if (codes.length > 0) {
    initCodebox();
}

/********** Window Click **********/
document.querySelector('.invisibleEl').addEventListener('click', e => {
    document.querySelectorAll('.nav--popout').forEach(menu => menu.classList.remove('is-open'));
    document.querySelectorAll('.button--menu').forEach(menu => menu.classList.remove('is-open'));
	e.target.classList.remove('menu-open');
});

/********** Index & Category View Only **********/
if(pageType === 'idx' || pageType === 'SC') {
	initForums();

    document.querySelector('.stats--recent').innerHTML = document.querySelector('#recent-topics table').outerHTML;
    document.querySelector('#recent-topics').remove();
}

/********** Profile **********/
if(pageType === 'Profile') {
    initMarkdown();
}

/********** Post View Only **********/
if(pageType === 'ST') {
    initPostRowDescription();
    initPostContentAlter();
    initDiscordTagging('#ST main > table > tbody > tr > td:last-child');
    initCarouselProgress('.post--progress-bar');

    let descript = $('.topic-desc').html();
    if (descript != undefined) {
        var newDescript = descript.replace(", ", "");
        $('.topic-desc').html(newDescript);
    }
    
    //input clean up
    document.querySelector('#qr_open .tablepad').innerHTML = document.querySelector('#qr_open .tablepad').innerHTML.replace('|', '');
    let textNodes = getAllTextNodes(document.querySelector('#qr_open .tablepad'));
    textNodes.forEach(node => {
        const paragraph = document.createElement('p');
        node.after(paragraph);
        paragraph.appendChild(node);
        paragraph.innerText = paragraph.innerText.replace(`|`, ``).trim();
    });
    document.querySelectorAll(`#qr_open input[type="checkbox"]`).forEach(input => inputWrap(input));
    document.querySelectorAll('#qr_open .input-wrap').forEach(label => {
        label.querySelector('input').insertAdjacentHTML('afterend', `<div class="fancy-input checkbox">${checkboxChecked}</div>`);
    });
    $('#qr_open .tablepad > input').wrapAll('<div class="qr_buttons"></div>');
    initMarkdown();
}

/********** Login **********/
if(pageType === 'Login') {
    let textNodes = getAllTextNodes(document.querySelector('main'));
    textNodes.forEach(node => {
        const paragraph = document.createElement('p');
        node.after(paragraph);
        paragraph.appendChild(node);
    });
    $("main > p").nextUntil("div.tableborder").andSelf().wrapAll(`<div class="textNodes"></div>`);
    $(`input[name="UserName"]`).attr('placeholder','Username');
    $(`input[name="PassWord"]`).attr('placeholder','Password');
}

/********** Registration **********/
if(pageType === 'Reg') {
    let textNodes = getAllTextNodes(document.querySelector('.tablepad > table > tbody > tr:first-child > td:last-child fieldset:first-child'));
    if(textNodes) {
        textNodes.forEach(node => {
            const paragraph = document.createElement('p');
            node.after(paragraph);
            paragraph.appendChild(node);
        });
    }
    inputWrap(`label[for="agree_cbox"] input[name="read_tos"]`);
    inputWrap(`fieldset input[name="allow_admin_mail"]`);
    inputWrap(`fieldset input[name="allow_member_mail"]`);
    fancyBoxes();
    if(document.querySelector('input[name="agree"][type="checkbox"]')) {
        $('input[name="agree"][type="checkbox"]').wrap('<label class="input-wrap tos"></label>');
        $('.input-wrap.tos').append(`<div class="fancy-input checkbox">${checkboxChecked}</div> <p>I agree to the terms of this registration, <b>I am at least 18 years of age,</b> and wish to proceed.</p>`);
    }
}

/********** Topic List Only **********/
if(pageType === 'SF') {
	initForums();
    initTopicsWrap();
    initTopicDescription('.topic--description');
    initStickyBar();
}

/********** Topic View **********/
if(pageType === 'Post') {
    if(document.querySelector('#topic-title')) {
        document.querySelector('#topic-title input').setAttribute('placeholder', 'Topic Title');
        document.querySelector('#topic-desc input').setAttribute('placeholder', 'Topic Description');
    }

    if(document.querySelector('#post-preview')) {
        initPostContentAlter('#post-preview > .row1 > .postcolor');
    }
    
    initMarkdown();

    let textNodes = getAllTextNodes(document.querySelector('#post-options .pformright'));
    if(textNodes) {
        textNodes.forEach(node => {
            const paragraph = document.createElement('p');
            node.after(paragraph);
            paragraph.appendChild(node);
        });
    }

    inputWrap(`input[name="enableemo"]`, 'br');
    inputWrap(`input[name="enablesig"]`, 'br');
    inputWrap(`input[name="enabletrack"]`, 'br');
    document.querySelectorAll('input[name="iconid"]').forEach(icon => {
        inputWrap(icon, `input`, 'radio');
    });
    fancyBoxes();

    //by sadri with edits by lux
    //https://sadricodes.notion.site/Simple-Custom-BBCode-Replacer-1934114f263e80b3b8e0e018963daec4
    showMoreCustomBBCode = (e) => {
        if (e.getAttribute("hiding") == "true") {
            e.setAttribute("hiding", false);
            e.value = "Less";
            const collapsed = document.querySelectorAll(".bbcCollapse");
            for (const col of collapsed) {
                col.classList.remove("bbcCollapse");
                col.classList.add("bbcCollapsible");
            }
        } else {
            e.setAttribute("hiding", true);
            e.value = "More";
            const uncollapse = document.querySelectorAll(".bbcCollapsible");
            for (const col of uncollapse) {
                col.classList.remove("bbcCollapsible");
                col.classList.add("bbcCollapse");
            }
        }
    };
      
    const setUpCustomBBcodeButtons = () => {
        const buttonDestination = document.getElementById("bbcode-buttons");
      
        let cbHolder = ``;
      
        for (const group of bbcode) {
            cbHolder += `<div class="customButtonSection ${group.extraClasses ?? ''}">`;
            if (group.tags.length < 1) continue;
            cbHolder += `<div class="cbHeader">${group.groupName}</div>`;
            cbHolder += `<div class="buttonHolder ${group.collapsed ? "bbcCollapse" : "bbcNoCollapse"}">`
            for (const bbc of group.tags) {
                // Hide buttons that already exist
                const exists = document.querySelector(`input[value=" ${bbc.tag.toUpperCase()} "]`);
                if (exists) {
                    exists.style.display = "none";
                }
                // Add the buttons in
                let newButton = `<input type="button"
                    class="codebuttons${bbc.collapsed ? ' bbcCollapse' : ''}"
                    data-tag-name="${bbc.tag}"
                    value="${bbc.displayName ? bbc.displayName : bbc.tag}"
                    data-tag-type="${bbc.type}"
                    ${bbc.desc ? `title="${bbc.desc}"` : ''}
                    ${bbc.complexIndicator ? `data-complex-indicator="${bbc.complexIndicator}"` : ''}
                    onclick="doSelectionReplace(this)">`;
                cbHolder += newButton;
            }
            cbHolder += `</div></div>`;
        }
      
        buttonDestination.innerHTML = cbHolder;
    };
      
    setUpCustomBBcodeButtons();
}
      
const doSelectionReplace = (button) => {
    if (button.dataset.tagName && button.dataset.tagType) {
        let tagName = button.dataset.tagName;
        const inputBox = document.forms["REPLIER"].elements["Post"];
        const selRange = inputBox.value.substring(inputBox.selectionStart, inputBox.selectionEnd);
        const replacement = `[${tagName}${button.dataset.tagType == 'complex' ? `=${button.dataset.complexIndicator}` : ''}]${selRange}[/${tagName}]`;
        inputBox.setRangeText(replacement, inputBox.selectionStart, inputBox.selectionEnd);
    }
};

/********** User CP & Messages **********/
if(pageType === 'UserCP' || pageType === 'Msg') {
    //ucp menu
	initUCPMenu();

	//Edit Profile Edits
	if($('body.code-01').length > 0 && pageType === 'UserCP') {
        cpShift();
        splitProfile();
        ucpAesthetics();
        ucpAvatars();
        if(fullWidthFields.length > 0) {
            fields = createFieldArray(fullWidthFields);
            document.querySelectorAll(fields).forEach(field => field.classList.add('fullWidth'));
        }
        if(thirdWidthFields.length > 0) {
            fields = createFieldArray(thirdWidthFields);
            document.querySelectorAll(fields).forEach(field => field.classList.add('oneThird'));
        }
        if(setHeightFields.length > 0) {
            fields = createFieldArray(setHeightFields);
            document.querySelectorAll(fields).forEach(field => field.classList.add('staticHeight'));
        }
        if(tallTextFields.length > 0) {
            fields = createFieldArray(tallTextFields);
            document.querySelectorAll(fields).forEach(field => field.classList.add('tallText'));
        }
        if(alignEndFields.length > 0) {
            fields = createFieldArray(alignEndFields);
            document.querySelectorAll(fields).forEach(field => field.classList.add('alignEnd'));
        }
        
        toggleFields.forEach(toggle => {
            document.querySelector(toggle).addEventListener('change', () => {
                cpShift();
                splitProfile();
                ucpAesthetics();
                ucpAvatars();
            });
        });

        avatarImageFields.forEach(field => {
            document.querySelector(field).addEventListener('keyup', () => {
                setTimeout(() => {
                    ucpAvatars();
                }, 500);
            });
        });

        aestheticImageFields.forEach(field => {
            document.querySelector(field).addEventListener('keyup', () => {
                setTimeout(() => {
                    ucpAesthetics();
                }, 500);
            });
        });
    }

    //subaccounts
    if($('body.code-54').length > 0 && pageType === 'UserCP') {
        document.querySelectorAll('input[name="sub_ids[]"]').forEach(input => {
            inputWrap(input);
        });
        fancyBoxes();
    }

    //alerts
    if($('body.code-alerts').length > 0 && pageType === 'UserCP') {
        document.querySelectorAll('input[name="alert_id[]"]').forEach(input => {
            inputWrap(input);
        });
        fancyBoxes();
    }

    //forum and topic subscriptions
    if ((pageClasses.contains('code-50') || pageClasses.contains('code-26')) && pageType === 'UserCP') {
        document.querySelectorAll('.tableborder > table > tbody > tr').forEach(row => {
            if(row.querySelectorAll('th, td').length === 1) {
                row.classList.add('ucp--header', 'pformstrip');
            }
        });

        if(pageClasses.contains('code-26')) {
            document.querySelectorAll(`.tableborder input[type="checkbox"]`).forEach(input => inputWrap(input));
            fancyBoxes();
        }
    }
    
    //board settings
    if (pageClasses.contains('code-04') && pageType === 'UserCP') {
        inputWrap(document.querySelector(`input[name="DST"]`));
        fancyBoxes();
    }
    
    //alert settings
    if ((pageClasses.contains('code-alerts_settings') || pageClasses.contains('code-02')) && pageType === 'UserCP') {
        document.querySelectorAll(`input[type="checkbox"]`).forEach(input => inputWrap(input));
        fancyBoxes();
    }

    //inbox
    if($('body.code-01').length > 0 && pageType === 'Msg') {
        document.querySelectorAll('#ucpcontent > form .dlight td:last-child .forminput[type="checkbox"]').forEach(input => {
            inputWrap(input);
        });
        fancyBoxes();
    }
    
    //send message
    if (pageClasses.contains('code-04') && pageType === 'Msg') {
        document.querySelectorAll(`input[type="checkbox"]`).forEach(input => inputWrap(input));
        fancyBoxes();
    }
}

/********** Store **********/
if(pageType === 'store') {
    initStoreMenu();
    if(document.querySelector('body.store-do_staff_inventory')) {
        document.querySelectorAll(`#ucpcontent input[type="checkbox"]`).forEach(input => inputWrap(input));
        fancyBoxes();
    }
}

/********** Member List Only **********/
if(pageType === 'Members') {
	initMembers();
}

/********** Store **********/
if(pageType === 'modcp') {
  initModCPMenu();
}

/********** Search Only **********/
if(pageType === 'Search') {
    initTopicDescription('#Search.code-show main > #search-topics .tablebasic > tbody > tr > td .desc, #Search.code-getactive main > #search-topics .tablebasic > tbody > tr > td .desc');
}


/********** Templates **********/
document.addEventListener( 'DOMContentLoaded', function() {
    document.querySelectorAll(`[data-type="gallery2"]`).forEach((gallery) => {
        var splide = new Splide(gallery, {
            type: 'loop',
            speed: '500',
            perPage: 1,
            perMove: 1,
            gap: 0,
            padding: 100,
            easing: 'ease',
            reducedMotion: {
                speed: 0
            }
        });
        let bar = splide.root.querySelector( '.gallery--progress-bar' );
        splide.on( 'mounted move', function () {
            var end  = splide.Components.Controller.getEnd() + 1;
            var rate = Math.min( ( splide.index + 1 ) / end, 1 );
            bar.style.width = String( 100 * rate ) + '%';
        });
        splide.mount();
    });
    document.querySelectorAll(`[data-type="socialgallery2"]`).forEach((gallery) => {
        let images = gallery.querySelectorAll('tag-image');
        let splide;
        images.forEach(image => image.classList.add('splide__slide'));
        if(images.length === 1) {
            splide = new Splide(gallery, {
                speed: '500',
                perPage: 1,
                perMove: 1,
                gap: 0,
                padding: 0,
                arrows: false,
                pagination: false,
                easing: 'ease',
                reducedMotion: {
                    speed: 0
                }
            });
        } else {
            splide = new Splide(gallery, {
                speed: '500',
                perPage: 1,
                perMove: 1,
                gap: 0,
                padding: {right: 50},
                pagination: false,
                easing: 'ease',
                reducedMotion: {
                    speed: 0
                }
            });
        }
        let bar = splide.root.querySelector( '.gallery--progress-bar' );
        splide.on( 'mounted move', function () {
            var end  = splide.Components.Controller.getEnd() + 1;
            var rate = Math.min( ( splide.index + 1 ) / end, 1 );
            bar.style.width = String( 100 * rate ) + '%';
        });
        splide.mount();
    });


    document.querySelectorAll(`[data-type="gallery"]`).forEach((gallery) => {
        var splide = new Splide(gallery, {
            type: 'loop',
            speed: '500',
            perPage: 1,
            perMove: 1,
            gap: 0,
            padding: 100,
            easing: 'ease',
            reducedMotion: {
                speed: 0
            }
        });
        splide.mount();
    });
    document.querySelectorAll(`[data-type="socialgallery"]`).forEach((gallery) => {
        let images = gallery.querySelectorAll('tag-image');
        let splide;
        images.forEach(image => image.classList.add('splide__slide'));
        if(images.length === 1) {
            splide = new Splide(gallery, {
                speed: '500',
                perPage: 1,
                perMove: 1,
                gap: 0,
                padding: 0,
                arrows: false,
                pagination: false,
                easing: 'ease',
                reducedMotion: {
                    speed: 0
                }
            });
        } else {
            splide = new Splide(gallery, {
                type: 'loop',
                speed: '500',
                perPage: 1,
                perMove: 1,
                gap: 0,
                padding: '10%',
                easing: 'ease',
                reducedMotion: {
                    speed: 0
                }
            });
        }
        splide.mount();
    });
});