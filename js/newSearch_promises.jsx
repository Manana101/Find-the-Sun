search = () => {
  //jeśli formularz nie jest poprawnie wypełniony, przerwij wykonywanie funkcji.
  if (this.props.formOk === false) {
    console.log('jestem w results w funkcji search w if - form not ok, więc nic nie robię');
    return
  //jeśli formularz jest poprawnie wypełniony:
  } else if (this.props.formOk === true) {
