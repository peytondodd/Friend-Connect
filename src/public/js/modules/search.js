var search = (function() {

    var search = document.querySelector(".navbar-searchInput");
    if (search) {
        var searchResultContainer = document.querySelector(".searchResultContainer");
        
        if (searchResultContainer) {
            searchResultContainer.addEventListener("click", searchDir);
        }
        search.addEventListener("keyup", searchKeyUp);
        search.addEventListener("focus", searchKeyUp);
        document.addEventListener("click", searchHide);
        search.parentElement.addEventListener("keydown", formAction);

        function searchDir(event) {
            if (event.target.innerText == "Name(a-z)" || 
            event.target.innerText == "Name(z-a)" || 
            event.target.innerText == "Popularity(views)") {
                sortSearchResult(event.target.innerText);
            }
        }

        function sortSearchResult(sortDir) {
            if (sortDir == "Name(a-z)") {
                result.sort(function(a, b) {
                    var first = (a.full_name).toLowerCase();
                    var second = (b.full_name).toLowerCase();
                    if (first == second) {
                        return 0;
                    }
                    return first > second ? 1 : -1;
                });
                displayNewResults(result);
            } else if (sortDir == "Name(z-a)") {
                result.sort(function(a, b) {
                    var first = (a.full_name).toLowerCase();
                    var second = (b.full_name).toLowerCase();
                    if (first == second) {
                        return 0;
                    }
                    return first < second ? 1 : -1;
                });
                displayNewResults(result);
            } else if (sortDir == "Popularity(views)") {
                result.sort(function(a, b) {
                    var first = Number(a.profile_views);
                    var second = Number(b.profile_views);
                    if (first == second) {
                        return 0;
                    }
                    return first < second ? 1 : -1;
                });
                displayNewResults(result);
            }
        }

        function searchKeyUp(event) {
            console.log(event.keyCode);
            if (event.keyCode != 37 && event.keyCode != 38 && 
                event.keyCode != 39 && event.keyCode != 40 &&
                event.keyCode != 13) {
                console.log("hi");
                // AJAX REQUEST
                realTimeSearch = event.target.value;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        //input.innerHTML = this.responseText;
                        console.log(this.responseText);
                        var searchData = JSON.parse(this.responseText);
                        searchDropDown(searchData , search.value);
                    }
                };
                xmlhttp.open("GET", "/search?realTimeSearch=" + realTimeSearch, true);
                xmlhttp.send();
            } else { //Navigation arrows and enter
                //locate highlight
                var highlightIndex = "none";
                var list = search.parentElement.children[1];
                for (var i = 0; i < list.children.length; i++) {
                    var itemClass = list.children[i].children[0].classList;
                    if (itemClass[1]) { //.selectedHightlight has been added
                        highlightIndex = i;
                    }
                }

                if (event.keyCode == 38) {
                    if (highlightIndex == "none") {
                        list.children[list.children.length-1].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[list.children.length-1].children[0].children[0].children[0].name;
                        search.value = searchTerm;
                    } else if (highlightIndex == 0) {
                        list.children[highlightIndex].children[0].classList.remove("searchHighlight");
                        list.children[list.children.length-1].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[list.children.length-1].children[0].children[0].children[0].name;
                        search.value = searchTerm;
                    } else {
                        list.children[highlightIndex].children[0].classList.remove("searchHighlight");
                        list.children[highlightIndex - 1].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[highlightIndex - 1].children[0].children[1];
                        if (searchTerm) {
                            search.value = searchTerm.innerText;
                        }
                    }

                } else if (event.keyCode == 40) {
                    if (highlightIndex == "none") { //beginning
                        list.children[0].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[0].children[0].children[1];
                        if (searchTerm) {
                            search.value = searchTerm.innerText;
                        }
                    } else if (highlightIndex == list.children.length -1) { // end
                        list.children[highlightIndex].children[0].classList.remove("searchHighlight");
                        list.children[0].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[0].children[0].children[1];
                        if (searchTerm) {
                            search.value = searchTerm.innerText;
                        }
                    } else { //middle
                        list.children[highlightIndex].children[0].classList.remove("searchHighlight");
                        list.children[highlightIndex + 1].children[0].classList.add("searchHighlight");
                        var searchTerm = list.children[highlightIndex + 1].children[0].children[1];
                        if (searchTerm) {
                            search.value = searchTerm.innerText;
                        } else {
                            if (highlightIndex + 1 == list.children.length -1) {
                                search.value = list.children[highlightIndex + 1].children[0].children[0].children[0].name;
                            }
                        }
                    }
                }

            }

        }
        
        function searchDropDown(searchData, searchTerm) {
            var searchContainer = search.parentElement.parentElement;
            if (searchContainer.children[0].children.length > 1) {
                for(var i = searchContainer.children[0].children.length-1; i > 0; i--) {
                    searchContainer.children[0].removeChild(searchContainer.children[0].children[i]);
                }
            }

            if (searchData[0]) {
                var dropDownBox = document.createElement("div");
                dropDownBox.className = "navbar-searchDropDown";
                
                for (var i = 0; i < searchData.length; i++) {
                    var dropBoxItem = document.createElement("a");
                    dropBoxItem.className = "navbar__searchItem"
                    dropBoxItem.href = "/profiles/user/"+searchData[i].id;
                    dropBoxItem.innerHTML = `
                        <div class="navbar__searchItem--itemBox">
                            <div class="navbar__searchItem--imgBox">
                                <img class="navbar__searchItem--img" src="/user_data/${searchData[i].img_src}" alt="">
                            </div>    
                            <a class="navbar__searchItem--name" name="${searchData[i].id}">${searchData[i].first_name} ${searchData[i].last_name}</a>    
                        </div>
                    `;
                    dropDownBox.appendChild(dropBoxItem);
                    if (i > 4) {
                        var leftSearch = searchData.length - i - 1;
                        var dropBoxItem = document.createElement("a");
                        //dropBoxItem.type = "submit";
                        dropBoxItem.className = "navbar__searchItem";
                        dropBoxItem.innerHTML = `
                        <div class="navbar__searchItem--itemBox">
                            <div class="text-center">
                                <input class="navbar__searchItem--seeMore" name="${searchTerm}" type="submit" value="See ${leftSearch} more results...">  
                            </div>
                        </div>
                        `;
                        dropDownBox.appendChild(dropBoxItem);
                        break;
                    }
                }
                searchContainer.children[0].appendChild(dropDownBox);
            }
        }

        function searchHide(event) {
            //console.log(event.target);
            if (event) {
                //if (event.target.className) {
                    var item = event.target.className;
                    //console.log(item);
                    if (item != "form-control navbar__searchItem" && item != "form-control navbar__searchItem--itemBox" && 
                    item != "form-control navbar__searchItem--imgBox" && item != "form-control navbar__searchItem--img" && 
                    item != "form-control navbar__searchItem--name" && item != "form-control navbar-searchInput" && 
                    item != "navbar__searchItem--seeMore") {
        
                        var searchContainer = search.parentElement.parentElement;
                        if (searchContainer.children[0].children.length > 1) {
                            for(var i = searchContainer.children[0].children.length-1; i > 0; i--) {
                                searchContainer.children[0].removeChild(searchContainer.children[0].children[i]);
                            }
                        }
        
                    }
                //}
            }
           
        }

        function formAction(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                //empty search
                if (search.value == "" && event.keyCode == 13) {
                    window.location.replace("/search");
                }
                //locate highlight
                var highlightIndex = "none";
                var list = search.parentElement.children[1];
                if (list) {
                    for (var i = 0; i < list.children.length; i++) {
                        var itemClass = list.children[i].children[0].classList;
                        if (itemClass[1]) { //.selectedHightlight has been added
                            highlightIndex = i;
                        }
                    }
                }
                if (highlightIndex != "none") {
                    var seeMore = list.children[highlightIndex].querySelector(".navbar__searchItem--seeMore");
                    if (!seeMore) {
                        var userId = list.children[highlightIndex].children[0].children[1].name;
                        window.location.replace("/profiles/user/" + userId);
                    } else {
                        noneDropSearch();
                    }

                } else {
                    noneDropSearch();
                }
            }
        }

        function noneDropSearch() {
            if (search.value != "") {
                var enterSearch = search.value.split(" ");
                if (enterSearch.length > 1) {
                    var link = "/search?q=";
                    enterSearch.forEach(function (value) {
                        link = link + value + "+";
                    });
                    link = link.substring(0, link.length-1); //remove ending + sign
            
                    window.location.replace(link);
                } else {
                    window.location.replace("/search?q=" + enterSearch[0]);
                }
            }
        }

        function displayNewResults(result) {
            var searchResultBox = searchResultContainer.querySelector(".searchResultBox");
            var searchResultLength = searchResultBox.children.length;
            for (var i = 0; i < searchResultLength; i++) { // remove previous
                searchResultBox.removeChild(searchResultBox.children[0]);
            }

            result.forEach(function(item) {
                var resultItem = document.createElement("a");
                resultItem.className = "searchResult__aTagRemove";
                resultItem.href = "/profiles/user/" + item.id;
                resultItem.innerHTML = `
                    <div class='searchResult'>
                        <div class='row mx-0 py-2'>
                            <div class='col-sm-3'>
                                <div class="searchResult__imageContainer">
                                    <img class="searchResult__image" src="/user_data/${item.img_src}" alt="profile pic">
                                </div>
                            </div>
                            <div class='col-sm-9'>
                                <div class='searchResult__userDetails'>
                                    <p class="m-0"><span class="text-muted">Status: </span><strong>${item.status}</strong></p>
                                    <p class="m-0"><span class="text-muted">Name: </span><strong>${item.first_name+" "+item.last_name}</strong></p>
                                    <p class="m-0"><span class="text-muted">Email: </span><strong>${item.email}</strong></p>
                                    <p class="m-0"><span class="text-muted">Joined: </span><strong>${item.created_at}</strong></p>
                                    <p class="m-0"><span class="text-muted">Profile Views: </span><strong>${item.profile_views}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>                
                `;
                var userDetails = resultItem.querySelector(".searchResult__userDetails");
                var section = ["Birthday", "Gender", "Education", "Work", "Location"];
                var sectionInfo = [item.birthday, item.gender, item.education, item.work, item.location];
                //birthday, gender, education, work, location
                sectionInfo.forEach(function(value,index) {
                    if (value != "" && value != "0000-00-00" && value != "0") {
                        var newSection = document.createElement("p");
                        newSection.className = "m-0";
                        newSection.innerHTML = `
                            <span class='text-muted'>${section[index]}: </span><strong>${value}</strong>
                        `;
                        userDetails.insertBefore(newSection, userDetails.children[userDetails.children.length - 2]);
                    }
                });
                if (item.description != "") {
                    var description = document.createElement("p");
                    description.className = "m-0";
                    if (item.descLength > 35) {
                        description.innerHTML = `
                            <span class='text-muted'>Description: </span>
                            <strong>${item.shortDesc}...</strong>
                            <span class='searchResult__fakeATag'> Read More</span>
                        `;
                    } else {
                        description.innerHTML = `
                            <span class='text-muted'>Description: </span>
                            <strong>${item.description}</strong>
                        `;
                    }
                    userDetails.insertBefore(description, userDetails.children[userDetails.children.length - 2]);
                }
                
                searchResultBox.appendChild(resultItem);
            });
        }

    }
})();