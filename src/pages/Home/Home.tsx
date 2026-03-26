import './Home.css';
import { Button } from '../../ui/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import CloseableInfo from '../../ui/CloseableInfo/CloseableInfo.tsx';
import { useState } from 'react';

function Home() {
    const navigate = useNavigate();

    const [isGreetingOpened, setIsGreetingOpened] = useState(true);

    if (!isGreetingOpened) {
        return (
            <div
                className="home__container"
                style={{ textAlign: 'center' }}
            >
                <span>На главном экране пусто :(</span>
            </div>
        );
    }

    return (
        <div className="home__container">
            <CloseableInfo
                title={'Split Costs. Simply.'}
                isOpen={isGreetingOpened}
                onStateChange={(isOpen) => { setIsGreetingOpened(isOpen); }}
            >
                <h3>Create a group. Add an expense. Split it instantly.</h3>
                <p>Perfect for...</p>
                <ul>
                    <li>🏠 Shared Apartment (Rent, utilities, groceries)</li>
                    <li>🚗 Road Trip (Fuel, hotels, food)</li>
                    <li>🎉 Party with Friends (Drinks, snacks, delivery)</li>
                    <li>💼 Business Project (Joint expenses, materials)</li>
                </ul>
                <Button
                    variant="primary"
                    children={'Create Your First Group'}
                    onClick={() => {
                        void navigate('/group');
                    }}
                />
            </CloseableInfo>
        </div>
    );
}

export default Home;
