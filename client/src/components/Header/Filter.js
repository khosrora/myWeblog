import { useContext } from 'react'
import { GlobalState } from './../../GlobalState';

const Filter = () => {

    const state = useContext(GlobalState);

    const [categories] = state.CategoriesAPI.categories;
    const [category, setCategory] = state.PostsAPI.category;

    const handleCate = e => {
        setCategory(e.target.value);
    }
    return (
            <select
                className="form-select form-control-sm"
                aria-label="form-select-sm example"
                name="cate"
                value={category}
                onChange={handleCate}>
                <option value="">تمام پست ها</option>
                {
                    categories.map(category => (
                        <option
                            value={"category=" + category.name}
                            key={category._id}
                        >
                            {category.name}
                        </option>
                    ))
                }
            </select>
    )
}

export default Filter
