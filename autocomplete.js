//root => html element that the autocomplete should be rendered into
//renderOption() => function that knows how to render the object's attribute
//onOptionSelect() => function that gets invoked when a user clicks on option
//fetchData() => function that extracts data from the api using http requests
const createAutoComplete=({ 
    root, 
    renderOption ,
    onOptionSelect ,
    inputValue ,
    fetchData
}) => {  
    //this root declared below has to be inputted to this 
    //independent autocomplete function
    // const root=document.querySelector('.autocomplete');
    root.innerHTML=`
        <label><b>Search For a Movie</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class=""dropdown-menu>
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input =root.querySelector('input');
    const dropdown=root.querySelector('.dropdown');
    const resultsWrapper=root.querySelector('.results');
    console.log(resultsWrapper);



    const onInput= async event => { 
            const items= await fetchData(event.target.value);
            //handle no result case 
            if(!items.length){
                dropdown.classList.remove('is-active');
            }

            //remove any previous content before adding any new one.
            resultsWrapper.innerHTML='';
            dropdown.classList.add('is-active');
            for(let item of items){ 
                const option=document.createElement('a');
                // to handle if img for the item is available or not 

                option.classList.add('dropdown-item')
                option.innerHTML= renderOption(item);

                option.addEventListener('click', () => {
                    dropdown.classList.remove('is-active');
                    input.value=inputValue(item); 
                    onOptionSelect(item);
                })
                resultsWrapper.appendChild(option);
            }


    };
    input.addEventListener('input',debounce(onInput));

    //to close the dropdown if clicked anywhere out of dropdown itself.
    document.addEventListener('click', event =>{
        if (!root.contains(event.target)) {
            dropdown.classList.remove("is-active");
        }
    
    });
};