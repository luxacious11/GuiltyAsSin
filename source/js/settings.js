//channel name does not have to match, but it makes the most sense if it does
//for the hook, do not include the full url, just the numeric and alphanumeric strings at the end (e.g., `numeric/alphanumeric`)
const discordChannels = [
	{title: `#channel`, hook: `hook`},
];

//member alias and acquire the id by right clicking their name in discord and "copy user id"
//if you don't see that option in the menu, you need to turn on developer mode
const discordTags = [
    {alias: `Name`, id: `ID`},
];

//role name doesn't have to match, can be contextualized
//to acquire the id, go to server settings > roles > the three dot menu > copy role id
//it will not copy with the ampersand but the ampersand is required. ensure all ids start with an ampersand for a role tag
const discordRoles = [
    {title: `Open`, id: `&ID`},
];

//the ampersand does not need to be present for the staffDiscordRole; this is for character sorting, not the tagging system
const staffDiscordRole = `ID`;

//this is for displaying the avatars for the visual account switcher and the member roster.
//just make sure the sitename matches and, if it does and the images still don't show, try changes 'uploads2' to 'uploads', sometimes jcink is weird
const uploads = `uploads2`;
const siteName = `sitename`;
const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];
const defaultSquare = 'https://picsum.photos/100';
const checkboxChecked = `<i class="fa-solid fa-check"></i>`;

//this is for character sorting, highlighting the edge of the sorting related messages
//the group name should by lowercase and should match what would appear in the Group column of the google sheet
//the number array is the RGB values, so rgb(0,0,0) would be equivalent to [0,0,0] in this instance
const colors = {
    'group name': [0, 0, 0],
}

//if you have items in the shop that you want to hide the "use" button when the item is in inventory, then add the _exact_ item name here in lowercase
const unusable = ['premium group', 'custom complex event', 'custom discord role & icon', 'custom event', 'custom subplot'];

//set your groups to manage removals of ooc account only elements (.oocOnly), character only elements (.charOnly), and staff only elements (.staffOnly)
const staffGroups = ['4'];
const oocGroups = [...staffGroups, '6'];
const optGroups = ['1', '3', '5'];

//templateWraps should be the class or tag name (if unique and not div) in a comma separated list
//this will apply the .no-template class if these are NOT present to allow additional styling, padding, etc as a built-in template
const templateWraps = `tag-wrap`;

//want markdown applied? add the class or tag name here in the comma separated list
const markdownSafe = `.markdown, .postcolor.no-template, .postcolor blockquote, .postcolor [data-markdown], .postcolor tag-content, .postcolor tag-msg, .postcolor tag-action`;

/** auto-tracker code by FizzyElf - https://fizzyelf.jcink.net **/
//these are the category and forum ids for a profile-based thread autotracker by fizzyelf
trackerParams = {
    //include
    includeCategoryIds: ['2', '3', '4', '5', '6', '7'],
    includeForumIds: [],
    ignoreForumIds: ['46', '47', '51', '52', '58'],

    //define au, comm, dev, archive forums
    historyForumIds: ['57'], //history
    commForumIds: ['19'], //comm
    commHistoryForumIds: ['55'], //comm history
    socialForumIds: ['20', '21'], //social
    socialHistoryForumIds: ['56'], //social history
    devForumIds: ['8', '9', '10', '11', '12', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77','81', '82'], //dev
    devHistoryForumIds: ['53'], //dev history
    reqForumIds: ['13', '14', '15', '16', '17'], //requests
    reqHistoryForumIds: ['18'], //request history
    eventForumIds: [], //events
    eventHistoryForumIds: [], //event history

    //set indicators
    indicators: ['fa-solid fa-check', 'fa-solid fa-star'], 
}

//should be plain numbers in a comma separated list, do not wrap in quotes
const fullWidthFields = [8, 13, 14, 24, 25, 26, 29, 30, 37, 38, 44, 67, 68, 69, 70, 45, 46, 47, 56, 42, 43, 65, 66]; //for ucp that has been gridded, sets the field to span the full grid width
const thirdWidthFields = [5, 6, 7, 17, 18, 19, 39, 40, 41]; //for when using manual birthday fields and there are six columns with default being 1/2 width in ucp
const setHeightFields = [15, 16, 28]; //for when you want a text area field to allow some coding, apostrophes, etc but want it to look like a standard text input
const tallTextFields = [44, 67, 69, 47];
const alignEndFields = [6, 7];

//toggle fields: account type, image type
const toggleFields = createFieldArray([1, 38, 56], true);
const characterFields = createFieldArray([14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 44, 45, 46, 47, 56, 67, 68, 69, 70]); //character only fields

const powerFields = createFieldArray([39, 40, 41, 42, 43]);

const allLayouts = createFieldArray([57]); //default aesthetics set up
const columnsOnly = createFieldArray([58]);
const mosaicOnly = createFieldArray([59, 60]);
const notDefault = createFieldArray([61, 62]);
const largeOnly = createFieldArray([63, 64]);

const avatarImageFields = createFieldArray([54, 55]); //which images are avatars, not aesthetics?

const aestheticImageFields = [...allLayouts, ...columnsOnly, ...mosaicOnly, ...notDefault, ...largeOnly];

//shouldn't need to change this
const aestheticFields = {
    'single': {
        showFields: allLayouts,
        hideFields: [...columnsOnly, ...mosaicOnly, ...notDefault, ...largeOnly],
    },
    'columns': {
        showFields: [...allLayouts, ...notDefault, ...columnsOnly],
        hideFields: [...mosaicOnly, ...largeOnly],
    },
    'smallmosaic': {
        showFields: [...allLayouts, ...notDefault, ...mosaicOnly],
        hideFields: [...largeOnly, ...columnsOnly],
    },
    'largemosaic': {
        showFields: [...allLayouts, ...notDefault, ...mosaicOnly, ...largeOnly],
        hideFields: [...columnsOnly],
    }
};

//for member info autofil from google sheet
const autofillFieldMapping = [
	{
		'jcink': 2,
		'sheet': 'Member',
	},
	{
		'jcink': 3,
		'sheet': 'Pronouns',
	},
	{
		'jcink': 4,
		'sheet': 'Age',
	},
	{
		'jcink': 5,
		'sheet': 'Language',
		checkRating: true,
	},
	{
		'jcink': 6,
		'sheet': 'Sex',
		checkRating: true,
	},
	{
		'jcink': 7,
		'sheet': 'Violence',
		checkRating: true,
	},
	{
		'jcink': 8,
		'sheet': 'Timezone',
	},
	{
		'jcink': 9,
		'sheet': 'Tense',
		checkText: true,
	},
	{
		'jcink': 10,
		'sheet': 'POV',
		checkText: true,
	},
	{
		'jcink': 11,
		'sheet': 'ResponseTime',
		checkText: true,
	},
	{
		'jcink': 12,
		'sheet': 'Frequency',
		checkText: true,
	},
	{
		'jcink': 13,
		'sheet': 'Triggers',
	}
];

//sets up a title and a description for each section of the ucp
//insertBefore is the field number as a number, not a string
//it will put the header and description before that input
//you can use html in the description, it'll load right, allowing full customization
//allHeaders are the headers ALWAYS visible
//charHeaders are the headers only available for characters

const allHeaders = [
{
sectionTitle: `Player`,
insertBefore: 1,
sectionDescription: `<p>This section is for information about <i>you</i>, the writer! This should be the same as the details on your OOC account for consistency's sake. If something changes, please make sure to update the change on <i>all</i> your accounts for that reason.</p><p>Already have your info on our claims sheet? Auto-fill your data with a click of a button! (Hint: You can use this to update your data based on the claims sheet too!)</p><div class="macro--button" onClick="autofillMemberData(this)" data-parent="1" data-account="3">Auto-fill Data</div>`,

},
{
sectionTitle: `Account Images`,
insertBefore: 54,
sectionDescription: `<div class="sample"></div><div class="text"><p>These are mandatory image fields for both OOC and character accounts. The images don't need to be specific sizes as they will crop/resize automatically depending on the size of the viewer's screen. We <i>do</i> ask that you use high-quality images that follow the ratio given in the field, for example a “wide” image should be wider than it is tall.</p><p><u>Please also remember to <a href="?act=UserCP&CODE=24" target="_blank">upload an avatar</a>.</u></p></div>`,
},
{
sectionTitle: `Customization`,
insertBefore: 65,
sectionDescription: `<p>These are optional "bonus" spots to customize the popout sidebar for you and you alone! You can use hyperlink HTML (provided below) to add custom links for ease of access, or drop a posting template in the code block for your own convenience- whatever you'd like to do, as it will only affect the profile that it's saved to!</p>

<tag-code>
<div onclick="highlightCode()" class="copyQuick">copy</div>
<pre><textarea class="scroll"><a href="URL">text</a></textarea></pre>
</tag-code>`,
},
{
sectionTitle: `Links`,
insertBefore: 48,
sectionDescription: `<p>These are for optional links to further information/resources for your character, or for you as a person on your OOC account! Some things you might include here are links to your development forum/threads, links to playlists, or even to a Pinterest board you've put together. You can even place wanted ads here! Please leave these fields blank if you do not want to use them, and please keep the titles on the shorter side- 1 to 2 words each.</p>`,
},
];
const charHeaders = [
{
sectionTitle: `Basic`,
insertBefore: 14,
sectionDescription: `<p>This section is for basic information about your character. All of it is <u>mandatory</u> except for "Partners", "Specs", and "Defining Features" which can be left blank if you choose. Please make sure to read up on the site setting to choose a residence that fits your character's circumstances, and be sure to update their profile if their living arrangement changes at any point!</p><p><b>Note:</b> Need to display a different birth year than the one that would be used to calculate your character's age? Use the code below in the Birth Year field!</p>

<tag-code>
<div onclick="highlightCode()" class="copyQuick">copy</div>
<pre><textarea class="scroll"><real>birth year to display here</real><calc>year to use for calculation here</calc></textarea></pre>
</tag-code>`,
},
{
sectionTitle: `Powers`,
insertBefore: 38,
sectionDescription: `<p>This section is specifically for your character's powers, if they have any. If you're unsure which category in the dropdown menu your character's power(s) fall into, feel free to ask a staff member for guidance! Every character should have something selected on the dropdown menu, but only characters with powers will need to actually fill out information about their abilities. As per our rules, we are <i>very</i> open-ended on what powers are allowed on-site, but you <u>must</u> have adequate limitations to balance it out or you will be asked to revise your profile. Again, when in doubt, don't hesitate to open a ticket with staff!</p>`,
},
{
sectionTitle: `Details`,
insertBefore: 44,
sectionDescription: `<p>This section includes your character's "Quick Facts" and "Freeform”. The "Quick Facts" are a bullet-point set of notes about your character, and should ideally provide a summary of the most important things to know about them. The "Freeform" content is entirely up to you- while there's no minimum length for it, it should give us another taste of what your character is like. Feel free to reach out in the Discord server for freeform ideas if you find yourself drawing a blank!</p>

<p>On the other hand, if you happen to hit the character maximum for the freeform, use the "Freeform Overflow" to continue writing. In most cases, however, this field will simply be left blank.</p>

<p>Most, if not all, of our HTML-based codes in our <a href="https://wherethehellis.jcink.net/index.php?showforum=4" target="_blank">Codebank</a> should work in our freeform.</p>

<p>It is worth noting that these, and most, sections of the application do support some limited markdown options for easier coding. These include ** on either side to bold, _ on either side to italicize, and || on either side to spoiler. Additionally, we have quicker ways to do lists available as markdown. The code is below:</p>

<tag-code>
<div onclick="highlightCode()" class="copyQuick">copy</div>
<pre><textarea class="scroll"><tl>+ List Item
+ List Item
+ List Item</tl></textarea></pre>
</tag-code>`,
},
{
sectionTitle: `Plotting`,
insertBefore: 69,
sectionDescription: `<p>This section serves as your "shipper" on-site and should give others a brief summary of your character (a paragraph or two, in the "Overview" field) as well as some ideas for potential plots you're looking for, as well as plots you have no interest in pursuing. Please do not leave either field blank; we ask you provide at <i>least</i> a few solid ideas in the "Plot Hooks" field, and if you are open to any plot types at all, please write that in the "Not Interested" field as well.</p>
<p>The only optional field here is the "Looking For" field, which should be written as a <u>short, comma-separated list of key words</u>, such as: friends, co-workers, past romance, finals, siblings.</p>`,
},
{
sectionTitle: `Relationships`,
insertBefore: 47,
sectionDescription: `<p>For relationships, while you're welcome to leave it blank at first if your character has none, we do consider it a required field that you should keep updated. You can do so with the following codes:</p>
<div data-type="grid" data-gap="smsquare" style="margin-top: 30px;">
<span>
<div class="h6">Title</div>
<tag-code>
<div onclick="highlightCode()" class="copyQuick">copy</div>
<pre><textarea class="scroll"><tag-shiptitle>Text</tag-shiptitle></textarea></pre>
</tag-code>
</span>
<span>
<div class="h6">Subtitle</div>
<tag-code>
<div onclick="highlightCode()" class="copyQuick">copy</div>
<pre><textarea class="scroll"><tag-shipsubtitle>Text</tag-shipsubtitle></textarea></pre>
</tag-code>
</span>
<span>
<div class="h6">No Link, No Image</div>
<tag-code>
<div onclick="highlightCode()" class="copyQuick">copy</div>
<pre><textarea class="scroll"><tag-relationship><b>First Last</b>
<span>details</span></tag-relationship></textarea></pre>
</tag-code>
</span>
<span>
<div class="h6">Linked, No Image</div>
<tag-code>
<div onclick="highlightCode()" class="copyQuick">copy</div>
<pre><textarea class="scroll"><tag-relationship><a href="/">First Last</a>
<span>details</span></tag-relationship></textarea></pre>
</tag-code>
</span>
<span>
<div class="h6">No Link with Image</div>
<tag-code>
<div onclick="highlightCode()" class="copyQuick">copy</div>
<pre><textarea class="scroll"><tag-relationship><img src="http://picsum.photos/100" />
<b>First Last</b>
<span>details</span></tag-relationship></textarea></pre>
</tag-code>
</span>
<span>
<div class="h6">Linked with Image</div>
<tag-code>
<div onclick="highlightCode()" class="copyQuick">copy</div>
<pre><textarea class="scroll"><tag-relationship><img src="http://picsum.photos/100" />
<a href="/">First Last</a>
<span>details</span></tag-relationship></textarea></pre>
</tag-code>
</span>
</div>`,
},
{
sectionTitle: `Aesthetics`,
insertBefore: 56,
sectionDescription: `<div class="sample"></div><div class="text"><p>These fields are for your character's "aesthetic" images for their profile. They do not have to be of the character themselves, and can instead be used to give everybody a glance of the character's "aesthetic", whether outfits they would wear, scenery they enjoy, or just general vibes! Please note that Discord does <u>not</u> allow itself to be used as an image host, so none of your profile images should be linked from a Discord server, whether public or private. If you need recommendations for an image host to use, feel free to ask in our Discord server. Any profiles with Discord-linked images will <i>not</i> be accepted until the are hosted elsewhere.</p></div>`,
},
];

//this is for google claims implementation using my standard set up.
//that means face claim, business claim with integrated jobs, face reserves, subplots with integrated claims and reserves, and discord webhooks for all of this
//forms are in the source/js/templates/forms directory
//the blank sheet can be duplicated from: https://docs.google.com/spreadsheets/d/1Tun8ddMReuDNAKPE0tASvB-f__13lkPK_dczmYbaGaM/edit?usp=sharing
//sheet must be set to viewable with link, then put the id below
//apps script must run through setup function, then deploy as a webapp, then put the deploy id below
const sheetID = '1buBqX-7xF2PTnk4KPGZkJplEGdsKv0vzT6n3kMhwvaY';
const deployID = 'AKfycbxw_tC4jLP8gn66FtZdbU9SAli1RbMMhzstiN_QBvYAxSj5iTg7kvMzZL9p72d594uWjg';

//these are the discord webhooks. do not include the full url, just the numeric and alphanumeric strings at the end (e.g., `numeric/alphanumeric`)
const reserveLogs = `1172357121472466994/h4gBFvuwmWrNWkA_FizzToQHNea1SvAFIhQFY4RedNk8a0PHowva3S-Pldg7ER6ymmnA`;
const businessLogs = `1172357121472466994/h4gBFvuwmWrNWkA_FizzToQHNea1SvAFIhQFY4RedNk8a0PHowva3S-Pldg7ER6ymmnA`;
const claimLogs = `1172357121472466994/h4gBFvuwmWrNWkA_FizzToQHNea1SvAFIhQFY4RedNk8a0PHowva3S-Pldg7ER6ymmnA`;
const modLogs = `1172357121472466994/h4gBFvuwmWrNWkA_FizzToQHNea1SvAFIhQFY4RedNk8a0PHowva3S-Pldg7ER6ymmnA`;
const staffLogs = `1172357121472466994/h4gBFvuwmWrNWkA_FizzToQHNea1SvAFIhQFY4RedNk8a0PHowva3S-Pldg7ER6ymmnA`;
const sortLogs = `1172357121472466994/h4gBFvuwmWrNWkA_FizzToQHNea1SvAFIhQFY4RedNk8a0PHowva3S-Pldg7ER6ymmnA`;
const announceLogs = `1172357121472466994/h4gBFvuwmWrNWkA_FizzToQHNea1SvAFIhQFY4RedNk8a0PHowva3S-Pldg7ER6ymmnA`;

//if using the base set up, these won't need to change
const claims = `https://opensheet.elk.sh/${sheetID}/Claims`;
const faceReserves = `https://opensheet.elk.sh/${sheetID}/FaceReserves`;
const plotReserves = `https://opensheet.elk.sh/${sheetID}/PlotReserves`;
const members = `https://opensheet.elk.sh/${sheetID}/Members`;
const plots = `https://opensheet.elk.sh/${sheetID}/Plots`;
const businesses = `https://opensheet.elk.sh/${sheetID}/Businesses`;

//default reserve days count
const defaultReserve = 14;

//default form error and success messages
const successMessage = `<blockquote class="fullWidth">Submission successful!</blockquote>
<button onclick="reloadForm(this)" type="button" class="fullWidth submit">Back to form</button>`;
const activeResExists = `<blockquote class="fullWidth warning">Uh-oh! That's already reserved. Maybe we can help you find another option - reach out in the Discord for help!</blockquote>`;
const prevResExists = `<blockquote class="fullWidth warning">Uh-oh! You've reserved that before! Reserves are non-renewable. If you don't remember doing this, please reach out to staff via Discord and we can review our records and discuss options with you!</blockquote>`;
const claimExists = `<blockquote class="fullWidth warning">Uh-oh! This is already in play! Maybe we can help you find another option - reach out in the Discord for help!</blockquote>`;
const limitReached = `<blockquote class="fullWidth warning">Uh-oh! This role has limited spots and it looks like they're all taken and/or reserved at this moment!</blockquote>`;

//default menus for ucp, store, modcp. these are the jcink versions
//find the local versions in source/js/defaultsMenus.js
//do not copy defaultsMenus.js to the jcink forum! it's lack of existence is what lets these three show through
const jcinkUCPLinks = `<div class="accordion--trigger" data-category="account"><b>Account</b></div>
        <div class="accordion--content" data-category="account">
            <a href="?act=UserCP&CODE=01">Edit Profile</a>
            <a href="?act=UserCP&CODE=24">Update Avatar</a>
            <a href="?act=UserCP&CODE=54">Sub-accounts</a>
            <a href="?act=UserCP&CODE=52">Edit Username</a>
            <a href="?act=UserCP&CODE=28">Change Password</a>
            <a href="?act=UserCP&CODE=08">Update Email</a>
        </div>
        <div class="accordion--trigger" data-category="messages"><b>Messages</b></div>
        <div class="accordion--content" data-category="messages">
            <a href="?act=Msg&CODE=01">Inbox</a>
            <a href="?act=Msg&CODE=04">Send Message</a>
        </div>
        <div class="accordion--trigger" data-category="tracking"><b>Tracking</b></div>
        <div class="accordion--content" data-category="tracking">
            <a href="?act=UserCP&CODE=alerts">Alerts</a>
            <a href="?act=UserCP&CODE=50">Forums</a>
            <a href="?act=UserCP&CODE=26">Topics</a>
        </div>
        <div class="accordion--trigger" data-category="settings"><b>Settings</b></div>
        <div class="accordion--content" data-category="settings">
            <a href="?act=UserCP&CODE=04">Board</a>
            <a href="?act=UserCP&CODE=alerts_settings">Alerts</a>
            <a href="?act=UserCP&CODE=02">Emails</a>
        </div>`;

const jcinkStoreLinks = `<div class="accordion--trigger" data-category="personal"><b>Personal</b></div>
        <div class="accordion--content" data-category="personal">
            <a href="?act=store&CODE=inventory">Inventory</a>
            <a href="?act=store&code=donate_money">Send Money</a>
            <a href="?act=store&code=donate_item">Send Item</a>
        </div>
        <div class="accordion--trigger" data-category="shop"><b>Shop</b></div>
        <div class="accordion--content" data-category="shop">
            <a href="?act=store">Home</a>
            <a href="?act=store&code=shop&category=000">Category</a>
        </div>
        <div class="accordion--trigger staffOnly" data-category="staff"><b>Staff</b></div>
        <div class="accordion--content staffOnly" data-category="staff">
            <a href="?act=store&code=fine" class="staffOnly">Fine</a>
            <a href="?act=store&code=edit_points" class="staffOnly">Edit Points</a>
            <a href="?act=store&code=edit_inventory" class="staffOnly">Edit Inventory</a>
        </div>`;

const jcinkModCPLinks = `<div class="accordion--trigger" data-category="forumsposts"><b>Forums & Posts</b></div>
        <div class="accordion--content" data-category="forumsposts">
            <a href="?act=modcp&CODE=queue">Queue</a>
            <a href="?act=modcp&CODE=reported">Reported</a>
            <a href="?act=modcp&CODE=modlogs">Logs</a>
            <a href="?act=modcp&CODE=prune">Prune</a>
        </div>
        <div class="accordion--trigger" data-category="users"><b>Users</b></div>
        <div class="accordion--content" data-category="users">
            <a href="?act=modcp&CODE=members">Edit</a>
            <a href="?act=modcp&CODE=warnpanel">Warn</a>
            <a href="?act=modcp&CODE=warnlogs">Logs</a>
            <a href="?act=modcp&CODE=ip">IP Tools</a>
            <a href="?act=modcp&CODE=validating">Validaion</a>
        </div>`;