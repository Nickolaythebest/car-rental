import styles from './HomePage.module.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className={styles.hero}>
      
        <div className={styles.content}>
          <h1 className={styles.title}>Find your perfect rental car</h1>
          <p className={styles.subtitle}>Reliable and budget-friendly rentals for any journey</p>
          <Button 
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/catalog"
            sx={{
              fontFamily: '"Manrope" sans-serif',
              borderRadius: '12px',
              padding: '12px 50px',
              width: '276px',
              height: '44px',
              fontWeight: 600,
              fontSize: 16,
              lineHeight: 1.25,

              backgroundColor: '#3470ff',
              '&:hover': {
                backgroundColor: '#0b44cd'
              }
            }}
          >
            View Catalog
          </Button>
        </div>
     
    </section>
  );
}

export default HomePage;
