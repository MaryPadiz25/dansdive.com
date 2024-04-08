document.addEventListener("DOMContentLoaded", function(){
    const customSelects = document.querySelectorAll
    (".custom-select");
    
    function updateSelectedOptions(customSelect){
        const selectedOptions = Array.from(customSelect.
            querySelectorAll(".option.active")).filter
            (option => option !== customSelect.querySelector
                (".option.all-tags"))
             .map(function(choose){
                return{
                    value: choose.getAttribute("data-value"),
                    text: choose.textContent.trim()
                };
             });

             const selectedValues = selectedOptions.map(function
                (option){
                    return option.value;
                });

                customSelect.querySelector(".tags_input").value = 
                selectedValues.join(', ');

                let tagsHTML = "";

                if(selectedOptions.length === 0){
                    tagsHTML = '<span class="placeholder">Select the Dive Package</span>';
                }else{
                    const maxTagsToShow = 10;
                    let additionalTagsCount = 0;

                    selectedOptions.forEach(function(option, index){
                        if(index < maxTagsToShow){
                            tagsHTML += '<span class="tag">'+option.text
                            +'<span class="remove-tag" data-value='
                            +option.value+'">&times;</span></span>';
                        }else{
                            additionalTagsCount++;
                        }
                    });
                    if(additionalTagsCount > 0){
                        tagsHTML +='<span class="tag">+'
                        +additionalTagsCount+'</span>';
                    }
                }
                customSelect.querySelector(".selected-options").
                innerHTML = tagsHTML;
    }

    customSelects.forEach(function(customSelect){
        const searchInput = customSelect.querySelector(".search-tags");
        const optionsContainer = customSelect.querySelector(".options");
        const noResultMessage = customSelect.querySelector(".no-result-message");
        const options = customSelect.querySelectorAll(".option");
        const allTagsOption = customSelect.querySelector(".option.all-tags");
        const clearButton = customSelect.querySelector(".clear");

        allTagsOption.addEventListener("click", function(){
            const isActive = allTagsOption.classList.contains
            ("active");

            options.forEach(function(option){
                if(option !== allTagsOption){
                    option.classList.toggle("active", !isActive);
                }
            });
            updateSelectedOptions(customSelect);
        });
        clearButton.addEventListener("click", function(){
            searchInput.value = "";
            options.forEach(function(option){
                option.style.display = "block";
            });
            noResultMessage.style.display = "none";
        });

        searchInput.addEventListener("input", function(){
            const searchTerm = searchInput.value.toLowerCase();

            options.forEach(function(option){
                const optionText= option.textContent.trim().
                toLocaleLowerCase();
                const shouldShow = optionText.includes
                (searchTerm);
                option.style.display = shouldShow ? "block" :
                "none";
            });

            const anyOptionsMatch = Array.from(options).some
            (option => option.style.display === "block");
            noResultMessage.style.display = anyOptionsMatch ?
            "none" : "block";

            if(searchTerm){
                optionsContainer.classList.add
                ("option-search-active");
            }else{
                optionsContainer.classList.remove
                ("option-search-active");
            }
        });

    });
    customSelects.forEach(function(customSelect){
        const options = customSelect.querySelectorAll(".option");
        options.forEach(function(option){
            option.addEventListener("click",function(){
                option.classList.toggle("active");
                updateSelectedOptions(customSelect);
            });
        });
    });
    document.addEventListener("click",function(event){
        const removeTag = event.target.closest("remove-tag");
        if(removeTag){
            const customSelect = removeTag.closest(".custom-select");
            const valueToRemove = removeTag.getAttribute("data-value");
            const optionToRemove = customSelect.querySelector(".option[data-value='"+valueToRemove+"']");
            optionToRemove.classList.remove("active");

            const otherSelectedOptions = customSelect.querySelectorAll(".option.active:not(.all-tags)");
            const allTagsOption = customSelect.querySelector(".option.all-tags");

            if(otherSelectedOptions.length === 0){
                allTagsOption.classList.remove("active");
            }
            updateSelectedOptions(customSelect);

        }
    });
        const selectBoxes = document.querySelectorAll(".select-box");
        selectBoxes.forEach(function(selectBox){
            selectBox.addEventListener("click",function(event){
                if(!event.target.closest(".tag")){
                    selectBox.parentNode.classList.toggle("open");
                }
            });
        });
        document.addEventListener("click",function(event){
            if(!event.target.closest(".custom-select")&& !event.
            target.classList.contains("remove-tag")){
                customSelects.forEach(function(customSelect){
                    customSelect.classList.remove("open");
                });
            }
        });
      
});