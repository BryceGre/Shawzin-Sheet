var Scales = [
    // C=0, D=1, E=2, F=3, G=4, A=5, B=6, C=7, D=8, E=9, F=10, G=11, A=12, B=13, C=14, D=15
    {
        // Note that we should never get this. Pentatonic Minor can
        // cover every note within a half-step on it's own, so the
        // calculations should never result in a "red" scale.
        name:"No Matching Scale",
        id: 1, // Use Pentatonic Minor as a generic matching set
        match:{
            "-0.5": "B", "0": "B", "0.5": "B",
            "1": "C", "1.5": "C", "2": "C", 
            "2.5" : "E", "3": "E", "3.5": "E",
            "4": "J", "4.5": "J",
            "5": "K", "5.5": "K", "6": "K",
            "6.5": "M", "7": "M", "7.5": "M",
            "8": "R", "8.5": "R", "9": "R",
            "9.5": "S", "10": "S", "10.5": "S",
            "11": "U", "11.5": "U",
            "12": "h", "12.5": "h", "13": "h",
            "13.5": "i", "14": "i", "14.5": "i",
            "15": "k", "15.5": "k"
        }
    },
    {
        name:"Pentatonic Minor",
        id: 1,
        match:{
            "0": "B",
            "1.5": "C",
            "3": "E",
            "4": "J",
            "5.5": "K",
            "7": "M",
            "8.5": "R",
            "10": "S",
            "11": "U",
            "12.5": "h",
            "14": "i",
            "15.5": "k"
        }
    },
    {
        name:"Pentatonic Major",
        id: 2,
        match:{
            "0": "B",
            "1": "C",
            "2": "E",
            "4": "J",
            "5": "K",
            "7": "M",
            "8": "R",
            "9": "S",
            "11": "U",
            "12": "h",
            "14": "i",
            "15": "k",
        }
    },
    {
        name:"Chromatic Low",
        id: 3,
        match:{
            "0": "B",
            "0.5": "C",
            "1": "E",
            "1.5": "J",
            "2": "K",
            "3": "M",
            "3.5": "R",
            "4": "S",
            "4.5": "U",
            "5": "h",
            "5.5": "i",
            "6": "k"
        }
    },
    {
        name:"Chromatic High",
        id: 3,
        match:{
            "7": "B",
            "7.5": "C",
            "8": "E",
            "8.5": "J",
            "9": "K",
            "10": "M",
            "10.5": "R",
            "11": "S",
            "11.5": "U",
            "12": "h",
            "12.5": "i",
            "13": "k"
        }
    },
    {
        name:"Hexatonic",
        id: 4,
        match:{
            "0": "B",
            "1.5": "C",
            "3": "E",
            "3.5": "J",
            "4": "K",
            "5.5": "M",
            "7": "R",
            "8.5": "S",
            "10": "U",
            "10.5": "h",
            "11": "i",
            "12.5": "k"
        }
    },
    {
        name:"Major",
        id: 5,
        match:{
            "0": "B",
            "1": "C",
            "2": "E",
            "3": "J",
            "4": "K",
            "5": "M",
            "6": "R",
            "7": "S",
            "8": "U",
            "9": "h",
            "10": "i",
            "11": "k"
        }
    },
    {
        name:"Minor",
        id: 6,
        match:{
            "0": "B",
            "1": "C",
            "1.5": "E",
            "3": "J",
            "4": "K",
            "4.5": "M",
            "5.5": "R",
            "7": "S",
            "8": "U",
            "8.5": "h",
            "10": "i",
            "11": "k"
        }
    },
    {
        name:"Hirajoshi",
        id: 7,
        match:{
            "0": "B",
            "0.5": "C",
            "3": "E",
            "3.5": "J",
            "5.5": "K",
            "7": "M",
            "7.5": "R",
            "10": "S",
            "10.5": "U",
            "12": "h",
            "14": "i",
            "14.5": "k"
        }
    },
    {
        name:"Phrygian",
        id: 8,
        match:{
            "0": "B",
            "0.5": "C",
            "2": "E",
            "3": "J",
            "4": "K",
            "4.5": "M",
            "5.5": "R",
            "7": "S",
            "7.5": "U",
            "9": "h",
            "10": "i",
            "11": "k"
        }
    }
];

var Parts = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"
];

var Tempo = [
    120, //8
    160, //6
    192, //5
    240, //4
    320, //3
    480, //2
    960, //1
];

$(function() {
    var notes = []; // Note elements per time
    var data = []; // Note values per time
    var used = {}; // Count of used note values
    var history = []; // Undo/Redo history
    var hisIndex = 0; // Index for history

    /***********************************/
    /********* Create Controls *********/
    /***********************************/

    // Populate and create scale dropdown
    for (let i = 1; i < Scales.length; i++) {
        var scale = Scales[i];
        var option = $(document.createElement("option"));
        option.attr("value", i);
        option.text(scale.name);
        $("#scale").append(option);
    }
    $("#scale").selectmenu({
        change: function(event, ui) {
            DetectScale($("#scale").val());
        }
    });
    // Create controls for flats, sharps, and tempo
    $("#mods").controlgroup();
    $("#beats").selectmenu();
    $("#tempo").spinner();

    // Create buttons
    $("#undo").button().click(function(e) {
        e.preventDefault();
        UndoNote();
    });
    $("#redo").button().click(function(e) {
        e.preventDefault();
        RedoNote();
    });
    $("#save").button().click(function(e) {
        e.preventDefault();
        saveDialog.dialog("open");
    });
    $("#load").button().click(function(e) {
        e.preventDefault();
        loadDialog.dialog("open");
    });
    $("#make").button().click(function(e) {
        e.preventDefault();
        makeDialog.dialog("open");
    });
    $("#help").button().click(function(e) {
        e.preventDefault();
        helpDialog.dialog("open");
    });
    
    // Populate and create save list selectable
    var savesString = localStorage.getItem("saves");
    if (savesString) {
        // parse list of saved songs
        var saves = JSON.parse(savesString);
        // loop through the list
        for (let i=0; i<saves.length; i++) {
            // create an element to be selectable on the save list
            let li1 = $(document.createElement("li"));
            li1.addClass("ui-widget-content");
            li1.html(saves[i]); //set save name
            // append the element and give it a click function
            $("#dialog-save").find(".file-select").append(li1);
            li1.click(function(e) {
                //set the filename field on click to match
                $("#dialog-save").find(".file-name").val(saves[i]);
            });
            
            // create an element to be selectable on the load list
            let li2 = $(document.createElement("li"));
            li2.addClass("ui-widget-content");
            li2.html(saves[i]); //set save name
            // append the element and give it a click function
            $("#dialog-load").find(".file-select").append(li2);
            li2.click(function(e) {
                //set the filename field on click to match
                $("#dialog-load").find(".file-name").val(saves[i]);
            });
        }
    }
    $("#file-select").selectable();

    // Create the save dialog
    var saveDialog = $("#dialog-save").dialog({
        autoOpen: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            Save: function() {
                // use the filename to save the song
                let name = $("#dialog-save").find(".file-name").val();
                if (SaveSong(name)) {
                    // save successful
                    $(this).dialog("close");
                }
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });
    // Create the load dialog
    var loadDialog = $("#dialog-load").dialog({
        autoOpen: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            Load: function() {
                // use the filename to load the song
                let name = $("#dialog-load").find(".file-name").val();
                if (LoadSong(name)) {
                    // load successful
                    $(this).dialog("close");
                }
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });
    // Create the make song dialog
    var makeDialog = $("#dialog-make").dialog({
        autoOpen: false,
        height: "auto",
        width: 400,
        modal: true,
        create: function(e, ui) {
            // Create copy button
            $("#make-copy").button().click(function(e) {
                e.preventDefault();
                $("#make-text").select();
                document.execCommand("copy");
            });
        },
        open: function(e, ui) {
            // Populate the result field with the song
            var songString = MakeSong();
            $("#make-text").val(songString);
        },
        buttons: {
            Continue: function() {
                $(this).dialog("close");
            }
        }
    });
    // Create the about dialog
    var helpDialog = $("#dialog-help").dialog({
        autoOpen: false,
        height: "auto",
        width: 600,
        modal: true,
        buttons: {
            Continue: function() {
                $(this).dialog("close");
            }
        }
    });

    /***********************************/
    /********* Create MainArea *********/
    /***********************************/

    // Create spaces for each note.
    var content = $("#content");
    for (let i = -1; i < 200; i++) {
        notes[i] = [];
        data[i] = "";
        // Create a "slot" which is the vertical space
        // representing a single point in time
        var slot = $(document.createElement("div"));
        slot.addClass((i < 0) ? "clef" : "slot");
        // Create 15 "notes" for the "slot" which are
        // locations to place a note in the slot.
        for (let n = 15; n >= 0; n--) {
            var note = $(document.createElement("div"));
            note.addClass("note");
            notes[i][n] = note;
            // Add 5 lines to start
            if (n > 0 && n < 12 && n % 2 == 0) {
                note.append(document.createElement("hr"));
            }
            if (i >= 0) {
                // We reserve i = -1 for an space to place the clef.
                // If we're here, then we're on a real note, so make
                // a click event.
                note.on("click", function(e) {
                    var mod = $('input[name=mod]:checked', '#mods').val();
                    // Add old note to history
                    history[hisIndex++] = { i: i, n0: data[i], n1: n+mod };
                    history.length = hisIndex;
                    // Set the data for this point in time to this note
                    SetNote(i, n+mod);
                    // Detect the scale and accuracy
                    DetectScale($("#scale").val());
                });
            } else if (n == 0) {
                // We reserve i = -1 for an space to place the clef.
                // If we're here, then we're on the space reverved
                // for the clef, so add it.
                var img = $(document.createElement("img"));
                img.addClass("clef");
                img.attr("src", "img/treble-clef.svg");
                note.append(img);
            }
            // Append the note to the slot
            slot.append(note);
        }
        // Also create a hidden note at the bottom.
        // This is needed because the page doesn't format correctly
        // if we don't have an extra line underneath the lowest note.
        var note = $(document.createElement("div"));
        note.addClass("note");
        note.append(document.createElement("hr"));
        slot.append(note);
        // Every 8 slots, add a measure line
        if (i % 8 == 0) {
            slot.addClass("measure");
        }
        // Append the slot to the main area
        content.append(slot);
    }

    /***********************************/
    /************ Functions ************/
    /***********************************/

    /**
     * Sets a note as active. This will remove any other
     * active notes from the slot, and if the active note
     * is the one to set, remove it.
     * 
     * @param i The slot to change
     * @param n The note to fill
     */
    function SetNote(i, n) {
        // Empty previous note
        ClearNote(i);
        if (data[i]) {
            // Remove existing note
            used[data[i]]--;
            if (used[data[i]] === 0) {
                delete used[data[i]];
            }
        }
        // Process change
        if (n) {
            if (data[i] === n) {
                // Note was changed to itself. This happens when the user
                // clicks a note that already exists. In this case, we
                // assume the user wants to toggle the note off.
                data[i] = "";
            } else {
                // Add the new note
                AddNote(i, n);
                // Update the data
                data[i] = n;
                // Add the note to the "used" variable
                if (used[data[i]] !== undefined) {
                    used[data[i]]++;
                } else {
                    used[data[i]] = 1;
                }
            }
        } else {
            // Note was changed to nothing, remove data.
            data[i] = "";
        }
        // Refactor nearby notes
        RefactorNotes(i);
    }

    /**
     * Add a note to the screen. This function does not try to remove
     * a previous note, does not update the "data" variable, and does
     * not refractor nearby notes.
     * You will probably want to call {@link SetNote} instead.
     * 
     * @param i {number} The slot to change
     * @param n {number} The note to fill
     */
    function AddNote(i, n) {
        // Get the note without it's mod (sharp or flat)
        var j = parseInt(n);
        // Get the note element that contains this note
        var note = notes[i][j];
        // If the note should contain a line but doesn't, add it.
        if (note.children().length == 0 && j % 2 == 0) {
            note.append(document.createElement("hr"));
        }
        // Create the image for the note
        var img = $(document.createElement("img"));
        img.addClass("note");
        // Flip the image if it is towards the top
        if (j > 10) {
            img.addClass("down");
        } else {
            img.addClass("up");
        }
        // Append the image to the note element
        note.append(img);
        // Add the image for the mod (sharp of flat)
        if (j != n) {
            // Create the image for the mod
            var img2 = $(document.createElement("img"));
            img2.addClass("mod");
            // Choose the appropriate image
            switch(n.substr(-1)) {
                case "b": //flat
                    img2.attr("src", "img/flat-mod.svg");
                    break;
                case "s": //sharp
                    img2.attr("src", "img/sharp-mod.svg");
                    break;
                default: //data corruption
                    console.error("Unrecognized mod");
            }
            // Append the image to the note element
            note.append(img2);
        }
    }

    /**
     * Removes a note from the screen. This function does not
     * update the "data" variable and does not refactor nearby
     * notes.
     * You will probably want to call {@link SetNote} instead.
     * 
     * @param i {number} The slot to change
     */
    function ClearNote(i) {
        // If there is a not here
        if (data[i]) {
            // Get the note element
            var d = parseInt(data[i]);
            var note = notes[i][d];
            // Empty it
            note.empty();
            // Re-add the line if it should be in this element
            if (d > 0 && d < 12 && d % 2 == 0) {
                note.append(document.createElement("hr"));
            }
        }
    }

    /**
     * Refactors nearby notes to make sense. For example, if a note
     * has another note immediatly following it, it should be an
     * eighth-note. If it is the first and only note in the measure,
     * it should be a whole note. And so on.
     * 
     * 
     * @param i {number} The slot that was changed
     */
    function RefactorNotes(i) {
        // Get start and end of measure
        var start = i - (i % 8);
        var end = start + 8;
        // Remember the length we have gone without a note
        var length = 0;
        // From the end of the measure to the start
        for (let k = end - 1; k >= start; k--) {
            // Increase length
            length++;
            // If there's a note here
            if (data[k]) {
                // Get the note image element
                var img = notes[k][parseInt(data[k])].children("img.note");
                // Remove any existing classes from the image
                img.removeClass("eighth");
                img.removeClass("quarter");
                img.removeClass("half");
                img.removeClass("whole");
                // Refactor the image
                if (k % 2 == 1) {
                    // A note on an odd index can only be an eighth-note.
                    img.attr("src", "img/eighth-note.svg");
                    img.addClass("eighth");
                } else if (k % 4 == 2 && length > 1) {
                    // A note on index 2 or 6 with no note following it
                    // can only be a quarter-note.
                    img.attr("src", "img/quarter-note.svg");
                    img.addClass("quarter");
                } else {
                    switch (length) {
                        case 1: 
                            // There is a note directly after this note,
                            // therefore it is an eighth-note.
                            img.attr("src", "img/eighth-note.svg");
                            img.addClass("eighth");
                            break;
                        case 2:
                        case 3:
                            // This note has 1 or 2 spaces following it and
                            // is not odd, therefore it is a quarter-note.
                            img.attr("src", "img/quarter-note.svg");
                            img.addClass("quarter");
                            break;
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            // This note has 3 to 6 spaces following it and
                            // is not odd, therefore it is a half-note.
                            img.attr("src", "img/half-note.svg");
                            img.addClass("half");
                            break;
                        case 8:
                            // this note takes up the whole measure,
                            // therefore it is a whole note.
                            img.attr("src", "img/whole-note.svg");
                            img.addClass("whole");
                            break;
                        default:
                            console.error("length error: " + length);
                    }
                }
                length = 0;
            }
        }
    }

    function UndoNote() {
        if (hisIndex > 0) {
            // Decrease index and undo history
            var his = history[--hisIndex];
            SetNote(his.i, his.n0);
            // Detect the scale and accuracy
            DetectScale($("#scale").val());
        }
    }

    function RedoNote() {
        if (hisIndex < history.length) {
            // Redo history and increase index
            var his = history[hisIndex++];
            SetNote(his.i, his.n1);
            // Detect the scale and accuracy
            DetectScale($("#scale").val());
        }
    }

    /**
     * Detects both the "best" scale to be used and the "accuracy"
     * of that or any given scale. Since notes can be approximated
     * by adding or removing a half-step, the "accuracy" of a
     * scale is determined by the ratio of approximated notes tp
     * exact notes. Based on this ratio, a "best" scale may be
     * chosen.
     * 
     * @param i The scale to calculate the accuracy for, or 0 to
     *      detect the best scale based on accuracy
     * @param getAcc {boolean} [false] True to get the accuracy of
     *      the best/given scale instead of the scale index
     * @param total {number} [0] The total number of notes. Used
     *      for performance and calculated if not given or 0
     * @returns {number} the index of the best/given scale, or
     *      the accuracy of the best/given scale
     */
    function DetectScale(i, getAcc, total = 0) {
        var bestScale = 0; // index of best scale
        var bestAcc = 0; // 0 to 1
        // If not given, calculate the total number of notes
        if (total == 0) {
            // Using the "used" variable is the most efficient
            for (var key in used) {
                if (used[key] <= 0) {
                    // Our "used" variable is corrupted
                    console.error("used error");
                    return;
                }
                total += used[key];
            }
            // Make sure there are notes
            if (total == 0) {
                // No notes to work with
                $("#detected").html("Detected: None");
                return 0;
            }
        }
        if (i > 0) {
            // We have been given a scale, test it
            bestScale = i; // only scale to be best scale
            var loose = 0; // the number of loose matches
            var match = Scales[i].match; // match array
            // Using the "used" variable is the most efficient
            for (var key in used) {
                // Calculate the numerical position of the note
                var num = parseInt(key);
                if (key.substr(-1) == "s") {
                    num += 0.5;
                } else if (key.substr(-1) == "b") {
                    num -= 0.5;
                }
                // Try for an exact match
                if (match[num]) {
                    continue;
                }
                // Try for a loose match
                if (match[(num+0.5)] || match[(num-0.5)]) {
                    loose += used[key];
                    continue;
                }
                // No match; mark bestScale as 0 to represent this
                bestScale = 0;
                break;
            }
            // If every note matched, calculate accuracy
            if (bestScale > 0) bestAcc = 1 - (loose / total);
        } else {
            // We have not been given a scale, test all of them
            for (let n = 1; n < Scales.length; n++) {
                // Detect the individual scale, getting the acc
                var acc = DetectScale(n, true, total);
                if (acc > bestAcc) {
                    // More exact matches than other scales so far
                    bestScale = n;
                    bestAcc = acc;
                    if (acc >= 1) {
                        // Every note is an exact match, break out
                        break;
                    }
                }
            }
        }
        // Update the detected text
        if (bestAcc >= 1) {
            // Perfect match, use green text and show 100%
            $("#detected").html("<span style='color:green'>"+Scales[bestScale].name+" (100%)</span>");
        } else if (bestScale > 0) {
            // Some notes approximated, use yellow text and show accuracy
            var percent = Math.floor(bestAcc * 100);
            $("#detected").html("<span style='color:#888800'>"+Scales[bestScale].name+" ("+percent+"%)</span>");
        } else {
            // No scale could be approximate, use red text and show 0%
            $("#detected").html("<span style='color:red'>"+Scales[i].name+" (0%)</span>");
        }
        // Return result
        return getAcc ? bestAcc : bestScale;
    }

    /**
     * Saves the current song under the given name. This will store
     * the song data (note values), beats, tempo, and chosen scale.
     * 
     * @param name {string} The (file)name to save the current
     *      song under
     * @returns {boolean} True of the save was successful
     */
    function SaveSong(name) {
        // create save object
        var save = {
            data: data, // note data
            scale: $("#scale").val(), //selected scale
            beats: parseInt($("#beats").val()), //selected beats
            tempo: parseInt($("#tempo").spinner("value")) //entered tempo
        }
        // try to save
        if (name) {
            // parse list of saved songs
            var savesString = localStorage.getItem("saves");
            var saves = savesString ? JSON.parse(savesString) : [];
            // Check the list for the name
            if (saves.indexOf(name) < 0) {
                // Save with this name did not exist, create it
                localStorage.setItem("save-" + name, JSON.stringify(save));
                // Add it to the list of save names
                saves.push(name);
                localStorage.setItem("saves", JSON.stringify(saves));
                // Create an element to be selectable on the save list
                let li = $(document.createElement("li"));
                li.addClass("ui-widget-content");
                li.text(name); //set save name
                // Append the element and give it a click function
                $("#dialog-save").find(".file-select").append(li);
                li.click(function(e) {
                    // Set the filename field on click to match
                    $("#dialog-save").find(".file-name").val(name);
                });
                return true; //success
            } else if (confirm("Override save \"" + name + "\"?")) {
                // Save with this name exists, and user chose to override
                localStorage.setItem("save-" + name, JSON.stringify(save));
                return true; //success
            }
        }
    }

    /**
     * Loads a saved song under the given name. This will load
     * the song data (note values), beats, tempo, and chosen scale.
     * 
     * @param name {string} The (file)name to load the current
     *      song from
     * @returns {boolean} True of the load was successful
     */
    function LoadSong(name) {
        // try to load
        if (name) {
            // parse list of saved songs
            var savesString = localStorage.getItem("saves");
            var saves = savesString ? JSON.parse(savesString) : [];
            // Check the list for the name
            if (saves.indexOf(name) >= 0) {
                // Get save object
                var save = JSON.parse(localStorage.getItem("save-" + name));
                // Set data
                for (let i = 0; i < data.length; i++) {
                    SetNote(i, save.data[i]);
                }
                data = save.data;
                DetectScale(save.scale);
                // Set scale
                $("#scale").val(save.scale), //selected scale
                $("#scale").selectmenu("refresh");
                // Set beats
                parseInt($("#beats").val(save.beats)),
                $("#beats").selectmenu("refresh");
                // Set tempo
                parseInt($("#tempo").spinner("value", save.tempo));
                return true; //success
            }
        }
    }

    /**
     * Take the current song's data (note values), beats, tempo,
     * and chosen scale and create a string that can be imported
     * into Warframe to play on the Shawzen.
     * 
     * @returns {string} String for the Sawzen
     */
    function MakeSong() {
        var beats = parseInt($("#beats").val());
        var tempo = parseInt($("#tempo").spinner("value"));
        if (tempo < 10) tempo = Tempo[tempo];
        var speed = Math.round(64 / ((tempo * beats) / 15));
        var scale = Scales[DetectScale($("#scale").val())];
        var match = scale.match;
        var outString = "";
        outString += scale.id;
        for (var i in data) {
            if (data[i]) {
                var num = parseInt(data[i]);
                if (data[i].substr(-1) == "s") {
                    num += 0.5;
                } else if (data[i].substr(-1) == "b") {
                    num -= 0.5;
                }
                if (match[num]) {
                    outString += match[num];
                } else if (match[(num+0.5)]) {
                    outString += match[(num+0.5)];
                } else if (match[(num-0.5)]) {
                    outString += match[(num-0.5)];
                } else {
                    console.error("Match error");
                }
                var measure = Math.floor((i * speed) / 64);
                if (measure > 64) console.error("Song length error");
                var part = ((i * speed) % 64);
                outString += Parts[measure];
                outString += Parts[part];
            }
        }
        console.log(outString);
        return outString;
    }
});