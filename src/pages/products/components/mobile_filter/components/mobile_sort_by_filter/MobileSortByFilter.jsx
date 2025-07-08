import './MobileSortByFilter.css'
import filters from '../../../../../../data/filters.json'
import { makeCapitalize } from '../../../../../../utils/GlobalUtils'
import { useFilters } from '../../../../../../hooks/useFilters';
import { FaCheck } from 'react-icons/fa';
const MobileSortByFilter = () => {
    const { state: appliedFilters, setSortByFilter } = useFilters();
    const sortBy = filters.find(filter => filter.name === 'Sort By');

    const isFilterSelected=(selectedFilter)=>appliedFilters.sortBy===selectedFilter

    return (
        <section id='mobile-sort-by-filter'>
            <header>
                <h4>Sort By</h4>
            </header>
            <main>
                {sortBy.options.map((sortValue, index) => {
                    return (
                        <button
                        onClick={()=>setSortByFilter(sortValue)} 
                        key={index} 
                        className={`sort-by-option ${isFilterSelected(sortValue)&&'selected'}` }>
                            {isFilterSelected(sortValue)&&<span className='all-centered'><FaCheck /></span>}
                            {makeCapitalize(sortValue.replaceAll("_"," "))}
                        </button>
                    )
                })}
            </main>
        </section>
    )
}

export default MobileSortByFilter
