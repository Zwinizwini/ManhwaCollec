import { allTagList } from "../utils/colors"

const ModifTag = ({tagList, setTagUpdate}) => {

    const clickItemTag = (e, tag) => {
        e.target.checked ? setTagUpdate ([...tagList, tag]) : setTagUpdate(tagList.filter(t => t !== tag))
    }

    return (
        <div className='select-tag'>
            <div className="select-btn">
                <span className="btn-text">Select Tag</span>
                <span className='arrow-dwn'>
                    ▼
                </span>
            </div>

            <ul className="tag-setlist">
                {allTagList.map(tag => 
                    {
                        const isChecked = tagList.includes(tag)
                        
                        return (
                            <li className="tag-item" key={tag}>
                                <input type="checkbox" name={tag} id={tag} 
                                    checked={isChecked} 
                                    onChange={(e) => clickItemTag(e, tag)}
                                />
                                <span className="checkbox"><span>✓</span></span>
                                <label htmlFor={tag}>{tag}</label>
                            </li>
                        )
                    }
                )}
            </ul>
        </div>
    )
}

export default ModifTag
