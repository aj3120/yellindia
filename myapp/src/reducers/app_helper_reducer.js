const app_helper_reducer = (state = {showMenu:{ showMenuFlag: 'none', showMenuFlagOpposite: 'block' }}, action) => {
    switch (action.type) {
          case "SHOW_MENU":
                return ({ ...state, showMenu: action.data });
          default:
                return (state);
    }
}

export default app_helper_reducer;