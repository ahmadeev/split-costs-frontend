import './ListMenu.css';
import { Link } from 'react-router-dom';
import Group from '../../icons/group_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Payments from '../../icons/payments_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import Person from '../../icons/person_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react';
import type { CSSProperties } from 'react';

const ICON_SIZE = '80%';

const ICON_STYLES: CSSProperties = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    fill: 'var(--third-background-color)',
    position: 'absolute',
    zIndex: '1',
};

const LISTS = [
    {
        link: '/list/users',
        text: 'Пользователи',
        icon: <Person style={ICON_STYLES} />,
    },
    {
        link: '/list/expenses',
        text: 'Расходы',
        icon: <Payments style={ICON_STYLES} />,
    },
    {
        link: '/list/groups',
        text: 'Группы',
        icon: <Group style={ICON_STYLES} />,
    },
];

export default function ListMenu() {
    return (
        <div className="list-menu__container">
            <h2>Доступные списки</h2>
            <div className="list-menu__grid">
                {
                    LISTS.map((list, i) => (
                        <Link
                            className={'list-menu__cell'}
                            key={i}
                            to={list.link}
                            style={{ position: 'relative' }}
                        >{list.icon}<span style={{ zIndex: '2', fontSize: '1rem' }}>{list.text}</span></Link>
                    ))
                }
            </div>
        </div>
    );
}
