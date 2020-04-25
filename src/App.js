// pq não importado?
// import React from 'react';

// step 4
// icons
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';


// step 5
// state
import React, { useState } from 'react';

// step 12
import { CSSTransition } from 'react-transition-group';

// step 1
function App() {
  return (
    
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon />}>

        <DropdownMenu />

      </NavItem>

    </Navbar>

  );
}

// step 2
// props pass arguments to a component when its called, like a attr in html
function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav"> { props.children }</ul>
    </nav>
  );
}

// step 3
function NavItem(props) {

  // step 6 (state)
  // não entendi essa linha não... pelo que parece o useState retorna dois valores que são >desestruturados<(?) e armazenados nessas duas constantes, é isso?
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      {/* step 7, controla o state */}
      {/* toda vez que clicar nesse botão vai rodar setOpen passando como argumento o contrário do que tá em open que em sequencia vai atualizar o useState(? ou o contrário?), ok, mas... onde q foi definido q setOpen é função? */}
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {/* used as <NavItem icon="😠" /> */}
        {props.icon}
      </a>

      {/* step 8, analisa o state e mostra os filhos */}
      {open && props.children}
    </li>
  );
}


// step 9
function DropdownMenu() {

  // step 13, definir qual dropdown vai ser visivel primeiro
  const [activeMenu, setActiveMenu] = useState('main');

  // step 16, state para a altura do menu
  const [menuHeight, setMenuHeight] = useState(null);

  // step 17, criar uma função para checar a altura do menu
  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height)
  }

  // step 10, nesting dropdowns
  function DropdownItem(props) {
    return (
      // step 15, por a função de mudar os menus
      // outra linha complicada de entender... o que é esse && q tá aparecendo? não é o AND de ifstate né? ou é para FAZER os dois? e não CHECAR os dois? a meu...
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>

        {props.children}

        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  // step 11, construir o master dropdown
  return (
    <div className="dropdown" style={{ height: menuHeight }}>

      {/* step 12, chamar e definir propriedades do CSSTransition */}
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        // step 18, chamar a função de altura por um método do CSSTransition
        onEnter={calcHeight}
        >
          {/* step 13, envolver numa div */}
          <div className="menu">
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem
              leftIcon={<BellIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="settings"
              >
                Settings
            </DropdownItem>
          </div>

      </CSSTransition>

      {/* step 14, duplicar o conteúdo e alterar propriedades, come;ando por activeMenu */}
      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem 
              leftIcon={<ArrowIcon />}
              goToMenu="main" />
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
          </div>

      </CSSTransition>
      
    </div>
  );
}



export default App;
