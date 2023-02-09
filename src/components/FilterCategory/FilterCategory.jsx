const FilterCategory = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Search By Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default FilterCategory
