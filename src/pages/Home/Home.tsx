import './Home.css';
import Button from '../../ui/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home__container">
            <h1>Split Costs.<br/>Simply.</h1>
            <h3>Create a group. Add an expense. Split it instantly.</h3>
            <p>Perfect for...</p>
            <ul>
                <li>🏠 Shared Apartment (Rent, utilities, groceries)</li>
                <li>🚗 Road Trip (Fuel, hotels, food)</li>
                <li>🎉 Party with Friends (Drinks, snacks, delivery)</li>
                <li>💼 Business Project (Joint expenses, materials)</li>
            </ul>
            <Button
                type="primary"
                title={'Create Your First Group'}
                onClick={() => {
                    void navigate('/group');
                }}
            />
        </div>
    );
}

export default Home;
