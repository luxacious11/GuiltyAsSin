/***** Profile *****/
function formatAesthetics(aesthetics, images) {
    let imageHTML;
    switch (aesthetics.toLowerCase()) {
        case 'largemosaic':
            imageHTML = `<span class="aesthetic--square one"><img src="${images['square-1']}" title="Square #1" alt="Square #1" loading="lazy" /></span>
                <span class="aesthetic--square two"><img src="${images['square-2']}" title="Square #2" alt="Square #2" loading="lazy" /></span>
                <span class="aesthetic--square three"><img src="${images['square-3']}" title="Square #3" alt="Square #3" loading="lazy" /></span>
                <span class="aesthetic--square four"><img src="${images['square-4']}" title="Square #4" alt="Square #4" loading="lazy" /></span>
                <span class="aesthetic--wide five"><img src="${images['wide-1']}" title="Wide #1" alt="Wide #1" loading="lazy" /></span>
                <span class="aesthetic--wide six"><img src="${images['wide-2']}" title="Wide #2" alt="Wide #2" loading="lazy" /></span>
                <span class="aesthetic--tall seven"><img src="${images['tall-1']}" title="Tall #1" alt="Tall #1" loading="lazy" /></span>`;
            break;
        case 'smallmosaic':
            imageHTML = `<span class="aesthetic--square one"><img src="${images['square-1']}" title="Square #1" alt="Square #1" loading="lazy" /></span>
                <span class="aesthetic--square two"><img src="${images['square-2']}" title="Square #2" alt="Square #2" loading="lazy" /></span>
                <span class="aesthetic--wide three"><img src="${images['wide-1']}" title="Wide #1" alt="Wide #1" loading="lazy" /></span>
                <span class="aesthetic--wide four"><img src="${images['wide-2']}" title="Wide #2" alt="Wide #2" loading="lazy" /></span>
                <span class="aesthetic--tall five"><img src="${images['tall-1']}" title="Tall #1" alt="Tall #1" loading="lazy" /></span>`;
            break;
        case 'columns':
            imageHTML = `<span class="aesthetic--square one"><img src="${images['square-1']}" title="Square #1" alt="Square #1" loading="lazy" /></span>
                <span class="aesthetic--tall two"><img src="${images['tall-1']}" title="Tall #1" alt="Tall #1" loading="lazy" /></span>
                <span class="aesthetic--tall three"><img src="${images['tall-2']}" title="Tall #2" alt="Tall #2" loading="lazy" /></span>
                <span class="aesthetic--square four"><img src="${images['square-2']}" title="Square #2" alt="Square #2" loading="lazy" /></span>`;
            break;
        case 'single':
        default: 
            imageHTML = `<span class="aesthetic--tall one"><img src="${images['tall-1']}" title="Tall #1" alt="Tall #1" loading="lazy" /></span>`;
            break;
    }
    return imageHTML;
}
function setRoster() {   
    let alphaChars = Alpha(document.querySelectorAll('select[name=showuser] option'));
    alphaChars.forEach(character => {
        let imageDiv = createAvatars('profile--roster-account-image', character.account, attributes = ``);

        let html = `<a class="profile--roster-account" href="?showuser=${character.account}">
            ${imageDiv}
            <div class="profile--roster-account-name">${formatName(character.character, 'span', 'last', true)}</div>
        </a>`;

        document.querySelector('.profile--roster').insertAdjacentHTML('beforeend', html);
    });
}
function initProfile (title, ratings) {
    document.querySelector('.profile--header h1').insertAdjacentHTML('beforeend', profileFormatName(title));
    ratings.forEach(rating => formatRating(rating));
    removeBlankFields();
}
function initCharacter(aesthetics, images, overflow, title, birthday, warnings, powerType, powers, isLocal = false) {
    //remove member sections
    document.querySelectorAll('.memAccOnly').forEach(item => item.remove());

    if(warnings !== `<i>No Information</i>` && warnings !== ``) {
        document.querySelector('.profile--triggers-inner .scroll').innerHTML = warnings;
    } else {
        document.querySelector('.profile--triggers').remove();
    }

    //set up aesthetics
    if(aesthetics !== `<i>No Information</i>` && aesthetics !== ``) {
	document.querySelector('.profile--aesthetic').classList.add(aesthetics);
        document.querySelector('.profile--aesthetic').innerHTML = formatAesthetics(aesthetics, images);
    }

    //set up age & birthday
    document.querySelector('age-clip').innerText = calculateAge(birthday);
    if (parseInt(birthday.year) < 0) {
        document.querySelector('birthday-clip').innerText = `${birthday.month} ${birthday.day}, ${parseInt(birthday.year) * -1} BC`;
    } else {
        document.querySelector('birthday-clip').innerText = `${birthday.month} ${birthday.day}, ${parseInt(birthday.year)}`;
    }

    if(powerType.toLowerCase() === 'powerless') {
        document.querySelectorAll('.powersOnly').forEach(item => item.remove());
    } else {
	document.querySelector('.clip-powers').innerHTML = formatPowers(powers);
    }

    //Freeform Overflow
    if(overflow !== `` && overflow !== `<i>No Information</i>`) {
        document.querySelector('.clip-freeform-overflow').insertAdjacentHTML('beforeend', overflow);
    }

    //Tracker
    if(!isLocal) {
        FillTracker(title, trackerParams);
    }

    initHashCarousel('Basics', '.profile--progress-bar');
    initAccordion();
}
function initMember() {
    //remove character only sections
    document.querySelectorAll('.charOnly').forEach(item => item.remove());

    //subaccounts list
    setRoster();
}

/****** UserCP/Messages ******/
function cpShift() {
	let imageType = document.querySelector(toggleFields[2]).value,
        powerType = document.querySelector(toggleFields[1]).value,
        account = document.querySelector(toggleFields[0]).value,
	    showFields = [],
	    hideFields = characterFields
                    .concat(aestheticFields['single'].hideFields)
                    .concat(aestheticFields['single'].hideFields)
                    .concat(allLayouts)
                    .concat(powerFields),
	    showHeaders = allHeaders;

	if(account == 'character') {
        showHeaders = allHeaders.concat(charHeaders);
        showFields = characterFields.concat(aestheticFields[imageType].showFields);
        hideFields = aestheticFields[imageType].hideFields;

        if(powerType !== 'powerless' && powerType !== 'unset') {
            showFields = [...showFields, ...powerFields];
        } else {
            hideFields = [...hideFields, ...powerFields];
        }
    }
    
    adjustCP(showFields, hideFields, showHeaders);
}
function setUpAesthetics() {
    let aestheticsObj = {
        'tall-1': document.querySelector('#field_57_input').value,
        'tall-2': document.querySelector('#field_58_input').value,
        'wide-1': document.querySelector('#field_59_input').value,
        'wide-2': document.querySelector('#field_60_input').value,
        'square-1': document.querySelector('#field_61_input').value,
        'square-2': document.querySelector('#field_62_input').value,
        'square-3': document.querySelector('#field_63_input').value,
        'square-4': document.querySelector('#field_64_input').value,
    };
    let aesthetics = getSelectText(document.querySelector('#field_56_input')).replace(' ', '');
    return {aestheticsObj, aesthetics};
}
function ucpAesthetics() {
    let imageObj = setUpAesthetics().aestheticsObj;
    let aesthetics = setUpAesthetics().aesthetics;
    console.log(aesthetics);

    let aestheticsSample = document.querySelector('.ucp--description[data-section="Aesthetics"] .sample');
    if(aestheticsSample) {
        aestheticsSample.classList.add(aesthetics.replace(' ', ''));
        aestheticsSample.innerHTML = formatAesthetics(aesthetics, imageObj);
    }
}
function ucpAvatars() {
    let avatarSample = document.querySelector('.ucp--description[data-section="AccountImages"] .sample');
    let avatarObj = {
        'tall': document.querySelector('#field_54_input').value,
        'wide': document.querySelector('#field_55_input').value,
    }

    let accType = getSelectText(document.querySelector('#field_1_input'));
    if(avatarSample) {
        let html = `<div class="avatars">
            ${formatAvatars(avatarObj)}
        </div></div>`;
        
        avatarSample.innerHTML = html;
    }
}
function formatAvatars(images) {
    let imageHTML = `<span class="tall"><img src="${images['tall']}" title="Tall Avatar" alt="Tall Avatar" loading="lazy" /></span>
    <span class="wide"><img src="${images['wide']}" title="Wide Avatar" alt="Wide Avatar" loading="lazy" /></span>`;
    return imageHTML;
}
function createFieldArray(arr, input = false) {
    if(input) {
        return arr.map(item => `#field_${item}_input`);
    }
    return arr.map(item => `#field_${item}`);
}

/****** Members Initialization ******/
function formatMemberRow(type, data, extraFilters = '') {
    let tagList = ``, info = ``, details = ``, sideSubtext = ``;
    if(type === 'character') {
        tagList += `${data.character.ageClass} ${data.character.relationshipClass} ${data.character.locationClass} ${data.character.powerClass}`;
        info += `<div class="member--info">
            <span>${data.character.age} years old</span>
            <span>${data.character.pronouns}</span>
            <span>${data.character.powerType}</span>
        </div>`;
        details = data.character.overview;
        sideSubtext = `<span>Played by ${data.writer.alias}</span>
            <span>${data.universal.posts} posts</span>
            <span>${data.universal.groupName}</span>`;
    } else {
        info += `<div class="member--info">
            <span>${data.writer.age} years old</span>
            <span>${data.writer.pronouns}</span>
            <span>${data.writer.timezone}</span>
        </div>`;
        details = data.writer.triggers;
        sideSubtext = `<span>Joined ${data.universal.dates.joined}</span>
            <span>${data.universal.posts} posts</span>
            <span>${data.universal.groupName}</span>`;
    }
    return `<div class="members--member grid-item g-${data.universal.groupID} ${data.writer.aliasClass} ${type} ${extraFilters} ${tagList}">
        <div class="member">
            <div class="member--topper">
                <a href="?showuser=${data.universal.id}">${formatName(data.universal.name)}</a>
                <div class="member--side-info">${sideSubtext}</div>
                <div class="member--image">
                    <img src="${data.universal.imageTall}" class="tall" />
                    <img src="${data.universal.imageWide}" class="wide" />
                </div>
            </div>
            <div class="member--bottom">
                ${info}
                <div class="scroll">${details}</div>
            </div>
            <div class="hidden member--sortable">
                <span class="member--name">${data.universal.name}</span>
                <span class="member--age">${data.character.age}</span>
                <span class="member--posts">${data.universal.posts}</span>
                <span class="member--join">${data.universal.dates.joined}</span>
            </div>
        </div>
    </div>`;
}
function toggleListMenu(e) {
    if(e.closest('.members--menu')) {
        e.closest('.members--menu').classList.toggle('is-open');
    } else if(e.closest('.webpage--menu')) {
        e.closest('.webpage--menu').classList.toggle('is-open');
    }
}