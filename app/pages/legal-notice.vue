<template>
  <UiCard id="impressum" tag="main">
    <section>
      <header>Angaben gemäß § 5 TMG:</header>
      <p>Sascha Münchow</p>
      <p>Scharbeutzer Straße 6</p>
      <p>22147 Hamburg</p>
    </section>
    <section>
      <header>Kontakt</header>
      <p>
        E-Mail:
        <CryptMail
          class="mail-link"
          name="sascha.muenchow"
          domain="gmx"
          tld="de"
        />
      </p>
    </section>
    <section>
      <header>Streitschlichtung</header>
      <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr">https://ec.europa.eu/consumers/odr</a>. Meine E-Mail-Adresse finden Sie oben im Impressum. Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </section>
  </UiCard>
</template>

<style scoped>
#impressum {
  grid-column: 2 / -1;
  grid-row: 2 / 6;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

section > header {
  font-size: 1.2em;
  font-weight: bold;
}

section > p {
  margin: 0;
}
</style>
