/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    var result = {
        "SearchTerm": "",
        "Results": []
    };

    if(arguments.length !== 2){
        return result;
    } else if(typeof searchTerm !== 'string'){
        return result;
    }

    result["SearchTerm"] = searchTerm;
    
    try {
        if(searchTerm.trim() !== ""){
            if(Array.isArray(scannedTextObj)){
                if(scannedTextObj.length > 50){
                    console.log('Consider searching a smaller set of books for faster performance')
                }
                for(let book of scannedTextObj){
                    if(book["ISBN"] && book["Content"] && Array.isArray(book["Content"])){
                        for(let page of book["Content"]){
                            if(page["Page"] && page["Line"] && page["Text"]){
                                let words = page["Text"].split(/\b[^\w\s]*\b/).filter(word => word.trim() !== '');
                                for(let word of words) {
                                    if (word === searchTerm) {
                                        result["Results"].push({
                                            "ISBN": book["ISBN"],
                                            "Page": page["Page"],
                                            "Line": page["Line"]
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        return result;
    }


    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

const shakespeare = [
    {
        "Title": "Romeo and Juliet",
        "ISBN": "9780671722852",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "Two households, both alike in dignity,"
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "In fair Verona, where we lay our scene,"
            },
            {
                "Page": 1,
                "Line": 3,
                "Text": "From ancient grudge break to new mutiny"
            } 
        ] 
    },
    {
        "Title": "Macbeth",
        "ISBN": "9780743477109",
        "Content": [
            {
                "Page": 300,
                "Line": 3,
                "Text": "Tomorrow, and tomorrow, and tomorrow,"
            },
            {
                "Page": 300,
                "Line": 4,
                "Text": "Creeps in this petty pace from day to day,"
            },
            {
                "Page": 300,
                "Line": 5,
                "Text": "To the last syllable of recorded time;"
            },
            {
                "Page": 300,
                "Line": 6,
                "Text": "And all our yesterdays have lighted fools"
            },
            {
                "Page": 300,
                "Line": 7,
                "Text": "The way to dusty death. Out, out, brief candle!"
            },
            {
                "Page": 300,
                "Line": 8,
                "Text": "Life\'s but a walking shadow, a poor player,"
            }
        ] 
    }
]

const missingFields = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531"
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8
            },
            {
                "Page": 31,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
    
]

/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const emptySearchOut = {
    "SearchTerm": "",
    "Results": []
}

const emptyBooksOut = {
    "SearchTerm": "the",
    "Results":[]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

//INPUT CASES
//Empty search term
const testEmptySearch = findSearchTermInBooks("", twentyLeaguesIn);
if (JSON.stringify(testEmptySearch) === JSON.stringify(emptySearchOut)) {
    console.log("PASS: Empty search returns no result");
} else {
    console.log("FAIL:  Empty search returns no result");
    console.log("Expected:", emptySearchOut);
    console.log("Received:", testEmptySearch);
}

//Empty books
const testEmptyBook = findSearchTermInBooks("the", []);
if (JSON.stringify(testEmptyBook) === JSON.stringify(emptyBooksOut)) {
    console.log("PASS: Empty books list returns no result");
} else {
    console.log("FAIL:  Empty books list returns no result");
    console.log("Expected:", emptyBooksOut);
    console.log("Received:", testEmptyBook);
}

//Too few parameters
const testOneParam = findSearchTermInBooks("");
if (JSON.stringify(testOneParam) === JSON.stringify(emptySearchOut)) {
    console.log("PASS: Too few parameters returns empty result");
} else {
    console.log("FAIL:  Too few parameters empty result");
    console.log("Expected:", emptySearchOut);
    console.log("Received:", testOneParam);
}

//Too many parameters
const testManyParam = findSearchTermInBooks("", [], "");
if (JSON.stringify(testManyParam) === JSON.stringify(emptySearchOut)) {
    console.log("PASS: Too many parameters returns empty result");
} else {
    console.log("FAIL:  Too many parameters returns empty result");
    console.log("Expected:", emptySearchOut);
    console.log("Received:", testManyParam);
}

//Non-string search term
const testWrongTerm = findSearchTermInBooks(5, []);
if (JSON.stringify(testWrongTerm) === JSON.stringify(emptySearchOut)) {
    console.log("PASS: Non-string search term returns empty result");
} else {
    console.log("FAIL:  Non-string search term returns empty result");
    console.log("Expected:", emptySearchOut);
    console.log("Received:", testWrongTerm);
}

//Non-array books list
const testWrongBooks = findSearchTermInBooks("the", 5);
if (JSON.stringify(testWrongBooks) === JSON.stringify(emptyBooksOut)) {
    console.log("PASS: Non-array books returns empty result");
} else {
    console.log("FAIL:  Non-array books returns empty result");
    console.log("Expected:", emptyBooksOut);
    console.log("Received:", testWrongBooks);
}

//Missing fields to search for terms in line
const testMissingFields = findSearchTermInBooks("the", missingFields);
if (JSON.stringify(testMissingFields) === JSON.stringify(emptyBooksOut)) {
    console.log("PASS: Missing fields returns empty result");
} else {
    console.log("FAIL: Missing fields returns empty result");
    console.log("Expected:", emptyBooksOut);
    console.log("Received:", testMissingFields);
}

//SEARCH CASES - POSITIVE RESULTS
//One book, one result is test1result, test2result

//One book, multiple results
const testOneBookMultiple = findSearchTermInBooks("and", twentyLeaguesIn);
if (testOneBookMultiple.Results.length === 2) {
    console.log("PASS: Term with multiple appearances returns multiple results");
} else {
    console.log("FAIL: Term with multiple appearances returns multiple results");
    console.log("Expected:", 2);
    console.log("Received:", testOneBookMultiple.Results.length);
}

//Multiple books, one result
const testMultipleBookOne = findSearchTermInBooks("Creeps", shakespeare);
if (testMultipleBookOne.Results.length === 1) {
    console.log("PASS: Term with one appearance across books list with multiple books returns one result");
} else {
    console.log("FAIL: Term with one appearance across books list with multiple books returns one result");
    console.log("Expected:", 1);
    console.log("Received:", testMultipleBookOne.Results.length);
}

//Multiple books, multiple results
const testMultipleBookMultiple = findSearchTermInBooks("our", shakespeare);
if (testMultipleBookMultiple.Results.length === 2) {
    console.log("PASS: Single character search returns result");
} else {
    console.log("FAIL: Single character search returns result");
    console.log("Expected:", 2);
    console.log("Received:", testMultipleBookMultiple.Results.length);
}

//Single character present standalone
const testSingleCharacterWord = findSearchTermInBooks("a", shakespeare);
if (testSingleCharacterWord.Results.length === 2) {
    console.log("PASS: Single character search returns result");
} else {
    console.log("FAIL: Single character search returns result");
    console.log("Expected:", 2);
    console.log("Received:", testSingleCharacterWord.Results.length);
}

//Input included next to punctuation mark
const testWordWithPunctuation = findSearchTermInBooks("dark", twentyLeaguesIn);
if (testWordWithPunctuation.Results.length === 1) {
    console.log("PASS: Special character search returns no result");
} else {
    console.log("FAIL:  Special character search returns no result");
    console.log("Expected:", 0);
    console.log("Received:", testWordWithPunctuation.Results);
}

//SEARCH CASES - NEGATIVE RESULTS
//Word not in books
const testNotWord = findSearchTermInBooks("rocket", twentyLeaguesIn);
if (testNotWord.Results.length == 0) {
    console.log("PASS: Word not present in books returns no result");
} else {
    console.log("FAIL:  Word not present in books no result");
    console.log("Expected:", 0);
    console.log("Received:", testNotWord.Results.length);
}

//Not standalone word but included in another word
const testNotStandalone = findSearchTermInBooks("man", twentyLeaguesIn);
const testNotStandaloneBase = findSearchTermInBooks("managed", twentyLeaguesIn);
if (testNotStandalone.Results.length !== testNotStandaloneBase.Results.length) {
    console.log("PASS: Word not present standalone but present in word in books returns no result");
} else {
    console.log("FAIL:  Word not present standalone but present in word in books returns no result");
    console.log("Expected: Not equal to ", testNotStandaloneBase.Results.length);
    console.log("Received:", testNotStandalone.Results.length);
}

//Case-sensitive
const testAllUpper = findSearchTermInBooks("THE", twentyLeaguesIn);
const testAllUpperBase = findSearchTermInBooks("the", twentyLeaguesIn); 
if (testAllUpper.Results.length !== testAllUpperBase.Results.length) {
    console.log("PASS: All upper case returns no result");
} else {
    console.log("FAIL:  All upper case returns no result");
    console.log("Expected: Not equal to ", testAllUpperBase.Results.length);
    console.log("Received:", testAllUpper.Results.length);
}

//Word with incorrect initial capitalization
const testFirstUpper = findSearchTermInBooks("Profound", twentyLeaguesIn); 
const testFirstUpperBase = findSearchTermInBooks("profound", twentyLeaguesIn);
if (testFirstUpper.Results.length !== testFirstUpperBase.Results.length) {
    console.log("PASS: Capitalization of present word returns no result");
} else {
    console.log("FAIL:  Capitalization of present word returns no result");
    console.log("Expected: Not equal to ", testFirstUpperBase.Results.length);
    console.log("Received:", testFirstUpper.Results.length);
}

//Whitespace search string
const testWhitespaceSearch = findSearchTermInBooks("    ", twentyLeaguesIn);
if (testWhitespaceSearch.Results.length == 0) {
    console.log("PASS: Whitespace search returns no result");
} else {
    console.log("FAIL:  Whitespace search returns no result");
    console.log("Expected:", 0);
    console.log("Received:", testWhitespaceSearch.Results.length);
}

//Single character not present standalone
const testSingleCharacterNotWord = findSearchTermInBooks("q", twentyLeaguesIn);
if (testSingleCharacterNotWord.Results.length == 0) {
    console.log("PASS: Single character not present standalone returns no result");
} else {
    console.log("FAIL:  Single character not present standaloneh returns no result");
    console.log("Expected:", 0);
    console.log("Received:", testSingleCharacterNotWord.Results.length);
}

//Special character not present
const testSpecialCharacter = findSearchTermInBooks("@", twentyLeaguesIn);
if (testSingleCharacterNotWord.Results.length == 0) {
    console.log("PASS: Special character search returns no result");
} else {
    console.log("FAIL:  Special character search returns no result");
    console.log("Expected:", 0);
    console.log("Received:", testSingleCharacterNotWord.Results.length);
}