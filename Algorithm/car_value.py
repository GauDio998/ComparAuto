import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
#from google.colab import files

# 1. CARICAMENTO DEI DATI
# -----------------------
# Carica il file CSV (esegui questa cella una sola volta)
# Se hai già caricato il file, commenta questa riga
uploaded = files.upload()  # Seleziona il file golf_gtd_dataset.csv.csv

# Leggi il file CSV 
file_name = next(iter(uploaded))  # Ottiene il nome del file caricato
df = pd.read_csv(file_name)

# Oppure se conosci già il nome del file:
# df = pd.read_csv('golf_gtd_dataset.csv.csv')

# Mostra le prime righe per verificare
print("Prime 5 righe del dataset:")
print(df.head())

# Informazioni sul dataset
print("\nInformazioni sul dataset:")
print(df.info())

# 2. PREPROCESSING
# ---------------
# Calcola la svalutazione in percentuale
df['Svalutazione_Percentuale'] = ((df['Prezzo di Listino'] - df['Prezzo']) / df['Prezzo di Listino']) * 100

# 3. ANALISI ESPLORATIVA
# ---------------------
# Statistiche descrittive
print("\nSTATISTICHE DESCRITTIVE")
print(df.describe())

# Analisi della svalutazione media per anno
svalutazione_per_anno = df.groupby('Anno')['Svalutazione_Percentuale'].mean()
print("\nSVALUTAZIONE MEDIA PER ANNO")
print(svalutazione_per_anno)

# Analisi della svalutazione media per condizioni
svalutazione_per_condizioni = df.groupby('Condizioni')['Svalutazione_Percentuale'].mean()
print("\nSVALUTAZIONE MEDIA PER CONDIZIONI")
print(svalutazione_per_condizioni)

# Calcolo delle correlazioni
print("\nMATRICE DI CORRELAZIONE CON SVALUTAZIONE")
correlazioni = df[['Anno', 'Chilometri', 'Prezzo di Listino', 'Prezzo', 'Svalutazione_Percentuale']].corr()
print(correlazioni['Svalutazione_Percentuale'])

# 4. VISUALIZZAZIONI
# -----------------
# Funzione per creare grafici di correlazione
def plot_correlazione(x, y, xlabel, ylabel, title):
    plt.figure(figsize=(10, 6))
    plt.scatter(x, y, alpha=0.7)
    
    # Aggiunge linea di tendenza
    z = np.polyfit(x, y, 1)
    p = np.poly1d(z)
    plt.plot(x, p(x), "r--")
    
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.title(title)
    plt.grid(True, linestyle='--', alpha=0.7)
    
    # Calcola e mostra il coefficiente di correlazione di Pearson
    corr = np.corrcoef(x, y)[0, 1]
    plt.annotate(f"Correlazione: {corr:.2f}", xy=(0.05, 0.95), xycoords='axes fraction')
    
    plt.tight_layout()
    return plt

# Grafico Chilometri vs Svalutazione
chilometri_plot = plot_correlazione(df['Chilometri'], df['Svalutazione_Percentuale'], 
                  'Chilometri', 'Svalutazione (%)', 
                  'Correlazione tra Chilometri e Svalutazione')
chilometri_plot.show()

# Grafico Anno vs Svalutazione
anno_plot = plot_correlazione(df['Anno'], df['Svalutazione_Percentuale'], 
                  'Anno', 'Svalutazione (%)', 
                  'Correlazione tra Anno e Svalutazione')
anno_plot.show()

# Boxplot della svalutazione per condizioni
plt.figure(figsize=(10, 6))
sns.boxplot(x='Condizioni', y='Svalutazione_Percentuale', data=df)
plt.title('Distribuzione della Svalutazione per Condizioni')
plt.grid(True, linestyle='--', alpha=0.7)
plt.tight_layout()
plt.show()

# 5. MODELLO DI MACHINE LEARNING - REGRESSIONE LINEARE
# ---------------------------------------------------
# Prepara i dati per il modello
X = df[['Anno', 'Chilometri']]  # Uso solo variabili numeriche per semplicità
y = df['Svalutazione_Percentuale']

# Se vuoi includere anche 'Condizioni', usa questo codice:
# X = df[['Anno', 'Chilometri', 'Condizioni']]

# Dividi i dati in set di training e test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Crea e configura il pipeline
# Se usi solo variabili numeriche:
pipeline = Pipeline([
    ('scaler', StandardScaler()),  # Normalizza i dati
    ('regressor', LinearRegression())  # Modello di regressione lineare
])

# Se vuoi includere anche 'Condizioni', usa questo codice:
# preprocessore = ColumnTransformer([
#     ('num', StandardScaler(), ['Anno', 'Chilometri']),
#     ('cat', OneHotEncoder(drop='first'), ['Condizioni'])
# ])
# pipeline = Pipeline([
#     ('preprocessore', preprocessore),
#     ('regressor', LinearRegression())
# ])

# Addestra il modello
pipeline.fit(X_train, y_train)

# Valuta il modello
y_pred = pipeline.predict(X_test)
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print("\nRISULTATI DEL MODELLO:")
print(f"R² (coefficiente di determinazione): {r2:.4f}")
print(f"RMSE (errore quadratico medio): {rmse:.4f}")

# Estrai i coefficienti del modello
if hasattr(pipeline['regressor'], 'coef_'):
    coefficienti = pipeline['regressor'].coef_
    print("\nCOEFFICIENTI DEL MODELLO:")
    feature_names = X.columns
    for feature, coef in zip(feature_names, coefficienti):
        print(f"{feature}: {coef:.4f}")

# 6. IMPORTANZA DELLE VARIABILI
# ----------------------------
# Calcola l'importanza relativa delle variabili
if hasattr(pipeline['regressor'], 'coef_'):
    importanze = np.abs(coefficienti)
    importanze_normalizzate = 100.0 * (importanze / np.sum(importanze))
    
    print("\nIMPORTANZA RELATIVA DELLE VARIABILI:")
    for feature, imp in zip(feature_names, importanze_normalizzate):
        print(f"{feature}: {imp:.2f}%")
    
    # Visualizza l'importanza delle variabili
    plt.figure(figsize=(10, 6))
    plt.bar(feature_names, importanze_normalizzate)
    plt.xlabel('Variabili')
    plt.ylabel('Importanza relativa (%)')
    plt.title('Importanza delle Variabili nel Modello di Svalutazione')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

# 7. SIMULATORE DI SVALUTAZIONE REALISTICO
# -------------------------------------
def prevedi_svalutazione(anno, chilometri):
    """
    Simula la svalutazione di una Golf GTD in base ai parametri
    usando il modello di machine learning addestrato
    """
    # Crea un DataFrame con i dati di input
    nuova_auto = pd.DataFrame({
        'Anno': [anno],
        'Chilometri': [chilometri]
    })
    
    # Predici la svalutazione usando il modello addestrato
    svalutazione_prevista = pipeline.predict(nuova_auto)[0]
    
    return svalutazione_prevista

def prevedi_svalutazione_nel_tempo(anno_base, km_base, prezzo_listino, anni_previsione, km_annui):
    """
    Implementa un modello di deprezzamento realistico che segue una curva esponenziale decrescente
    """
    anno_attuale = 2025  # Anno corrente
    
    # Calcola la svalutazione iniziale usando il modello ML
    svalutazione_attuale = prevedi_svalutazione(anno_base, km_base)
    valore_attuale = prezzo_listino * (1 - svalutazione_attuale/100)
    
    # Prepara le liste per i risultati
    anni = [anno_attuale]
    chilometri = [km_base]
    svalutazioni = [svalutazione_attuale]
    valori = [valore_attuale]
    perdite_euro = []
    perdite_percentuali = []
    
    # Parametri del modello di deprezzamento realistico
    # Questi parametri sono calibrati per riflettere il fatto che:
    # 1. Il deprezzamento è più rapido nei primi anni
    # 2. Rallenta progressivamente negli anni successivi
    # 3. È influenzato sia dall'età che dai chilometri
    
    # Tasso base di deprezzamento annuo (decresce nel tempo)
    tasso_base_iniziale = 0.09  # 9% il primo anno
    fattore_decrescita = 0.85   # Il tasso diminuisce del 15% ogni anno
    
    # Effetto chilometri sul deprezzamento (cresce con i km)
    coefficiente_km = 0.20      # Impatto dei km sul deprezzamento
    
    # Calcola il deprezzamento per ogni anno futuro
    valore_precedente = valore_attuale
    tasso_base = tasso_base_iniziale
    
    for i in range(1, anni_previsione + 1):
        anno_futuro = anno_attuale + i
        km_totali = km_base + (km_annui * i)
        
        # Il tasso di deprezzamento decresce nel tempo (effetto esponenziale)
        tasso_base *= fattore_decrescita
        
        # L'effetto dei chilometri sul deprezzamento
        km_aggiuntivi = km_annui
        effetto_km = (km_aggiuntivi / 20000) * coefficiente_km  # Normalizzato per 20,000 km
        
        # Calcola il tasso di deprezzamento annuo complessivo
        # Il tasso decresce con l'età ma aumenta con i chilometri
        tasso_annuo = tasso_base + effetto_km
        
        # Calcola il nuovo valore
        valore_nuovo = valore_precedente * (1 - tasso_annuo)
        
        # Calcola la svalutazione rispetto al prezzo di listino
        svalutazione_totale = ((prezzo_listino - valore_nuovo) / prezzo_listino) * 100
        
        # Calcola la perdita in euro e in percentuale per questo anno
        perdita_euro = valore_precedente - valore_nuovo
        perdita_percentuale = (perdita_euro / valore_precedente) * 100
        
        # Aggiungi i dati alle liste
        anni.append(anno_futuro)
        chilometri.append(km_totali)
        svalutazioni.append(svalutazione_totale)
        valori.append(valore_nuovo)
        perdite_euro.append(perdita_euro)
        perdite_percentuali.append(perdita_percentuale)
        
        valore_precedente = valore_nuovo
    
    return {
        'anni': anni,
        'chilometri': chilometri,
        'svalutazioni': svalutazioni,
        'valori': valori,
        'perdite_euro': perdite_euro,
        'perdite_percentuali': perdite_percentuali
    }

# Esempi di previsione con il modello ML di base
print("\nSIMULAZIONI DI SVALUTAZIONE USANDO IL MODELLO ML:")
print(f"Auto del 2021 con 50.000 km: {prevedi_svalutazione(2021, 50000):.2f}% di svalutazione")
print(f"Auto del 2022 con 30.000 km: {prevedi_svalutazione(2022, 30000):.2f}% di svalutazione")
print(f"Auto del 2023 con 15.000 km: {prevedi_svalutazione(2023, 15000):.2f}% di svalutazione")

# Grafico 3D della svalutazione in funzione di Anno e Chilometri
from mpl_toolkits.mplot3d import Axes3D

# Crea una griglia di valori
anni = np.linspace(df['Anno'].min(), df['Anno'].max(), 20)
chilometri = np.linspace(df['Chilometri'].min(), df['Chilometri'].max(), 20)
X_grid, Y_grid = np.meshgrid(anni, chilometri)

# Prepara i dati per la previsione
dati_griglia = np.vstack([X_grid.ravel(), Y_grid.ravel()]).T
df_griglia = pd.DataFrame(dati_griglia, columns=['Anno', 'Chilometri'])

# Fai la previsione
Z_grid = pipeline.predict(df_griglia).reshape(X_grid.shape)

# Crea il grafico 3D
fig = plt.figure(figsize=(12, 8))
ax = fig.add_subplot(111, projection='3d')
surf = ax.plot_surface(X_grid, Y_grid, Z_grid, cmap='viridis', alpha=0.7)

# Aggiungi i punti dati reali
ax.scatter(df['Anno'], df['Chilometri'], df['Svalutazione_Percentuale'], 
           color='red', s=50, alpha=0.5)

ax.set_xlabel('Anno')
ax.set_ylabel('Chilometri')
ax.set_zlabel('Svalutazione (%)')
ax.set_title('Modello 3D della Svalutazione delle Golf GTD')

# Aggiungi una barra di colore
fig.colorbar(surf, ax=ax, shrink=0.5, aspect=5)

plt.tight_layout()
plt.show()

print("\nAnalisi completata! Puoi utilizzare la funzione 'prevedi_svalutazione(anno, chilometri)' per fare altre simulazioni.")

# 8. INTERFACCIA INTERATTIVA PER PREVISIONI CON CURVA DI DEPREZZAMENTO REALISTICO
# -----------------------------------------------------------------
from ipywidgets import widgets
from IPython.display import display, clear_output
import matplotlib.pyplot as plt

def interfaccia_previsione():
    # Crea widget per l'input
    titolo = widgets.HTML(value="<h3>Simulatore di Svalutazione Golf GTD</h3>")
    anno_widget = widgets.IntSlider(min=2018, max=2025, value=2022, description='Anno:')
    km_widget = widgets.IntSlider(min=0, max=150000, step=1000, value=30000, description='Chilometri:')
    anni_previsione = widgets.IntSlider(min=1, max=10, value=5, description='Anni di previsione:')
    km_annui = widgets.IntSlider(min=0, max=30000, step=500, value=15000, description='Km annui:')
    bottone_calcola = widgets.Button(description='Calcola Svalutazione')
    output_area = widgets.Output()
    
    # Layout per organizzare i widget
    box_layout = widgets.Layout(display='flex', flex_flow='column', align_items='stretch', width='80%')
    form = widgets.VBox([titolo, anno_widget, km_widget, anni_previsione, km_annui, bottone_calcola, output_area], layout=box_layout)
    
    # Funzione per gestire il click sul bottone
    def on_calcola_button_click(b):
        with output_area:
            clear_output()
            anno = anno_widget.value
            chilometri = km_widget.value
            anni_futuri = anni_previsione.value
            chilometri_annui = km_annui.value
            
            # Ottieni il prezzo medio di listino dal dataset
            prezzo_medio_listino = df['Prezzo di Listino'].mean()
            
            print(f"🔍 ANALISI DELLA SVALUTAZIONE")
            print(f"==================================================")
            print(f"Il modello utilizza una combinazione di:")
            print(f"- Modello di machine learning (per la svalutazione iniziale)")
            print(f"- Curva di deprezzamento esponenziale decrescente (per la proiezione temporale)")
            print(f"- Effetto dei chilometri sul tasso di deprezzamento")
            
            # Calcola la svalutazione usando il modello realistico
            risultati = prevedi_svalutazione_nel_tempo(
                anno_base=anno, 
                km_base=chilometri, 
                prezzo_listino=prezzo_medio_listino,
                anni_previsione=anni_futuri,
                km_annui=chilometri_annui
            )
            
            print(f"\n📊 SVALUTAZIONE ATTUALE:")
            print(f"==========================")
            print(f"Anno: {anno}")
            print(f"Chilometri: {chilometri:,}")
            print(f"Svalutazione prevista: {risultati['svalutazioni'][0]:.2f}%")
            
            print(f"\n💰 VALUTAZIONE FINANZIARIA ATTUALE:")
            print(f"==========================")
            print(f"Prezzo medio di listino di riferimento: €{prezzo_medio_listino:,.2f}")
            print(f"Valore stimato attuale: €{risultati['valori'][0]:,.2f}")
            
            # Calcola la svalutazione futura per ogni anno
            print(f"\n📈 PREVISIONE SVALUTAZIONE NEI PROSSIMI {anni_futuri} ANNI:")
            print(f"==========================")
            print(f"{'Anno':^8} | {'Km Totali':^12} | {'Svalutazione %':^15} | {'Valore Stimato':^15} | {'Perdita Annua (€)':^15} | {'Perdita Annua (%)':^15}")
            print(f"{'-'*8:^8} | {'-'*12:^12} | {'-'*15:^15} | {'-'*15:^15} | {'-'*15:^15} | {'-'*15:^15}")
            
            # Stampa i risultati anno per anno
            for i in range(len(risultati['anni'])):
                if i == 0:
                    # Anno corrente
                    print(f"{risultati['anni'][i]:^8} | {risultati['chilometri'][i]:^12,} | {risultati['svalutazioni'][i]:^15,.2f}% | {risultati['valori'][i]:^15,.2f}€ | {'-':^15} | {'-':^15}")
                else:
                    # Anni futuri
                    print(f"{risultati['anni'][i]:^8} | {risultati['chilometri'][i]:^12,} | {risultati['svalutazioni'][i]:^15,.2f}% | {risultati['valori'][i]:^15,.2f}€ | {risultati['perdite_euro'][i-1]:^15,.2f}€ | {risultati['perdite_percentuali'][i-1]:^15,.2f}%")
            
            # Calcola la svalutazione totale nel periodo
            valore_iniziale = risultati['valori'][0]
            valore_finale = risultati['valori'][-1]
            svalutazione_periodo = ((valore_iniziale - valore_finale) / valore_iniziale) * 100
            
            print(f"\n📊 RIEPILOGO SVALUTAZIONE NEL PERIODO {risultati['anni'][0]}-{risultati['anni'][-1]}:")
            print(f"==========================")
            print(f"Valore iniziale (oggi): €{valore_iniziale:,.2f}")
            print(f"Valore finale (dopo {anni_futuri} anni): €{valore_finale:,.2f}")
            print(f"Perdita totale di valore: €{(valore_iniziale - valore_finale):,.2f} ({svalutazione_periodo:.2f}%)")
            
            # Crea i grafici della curva di deprezzamento
            plt.figure(figsize=(14, 10))
            
            # Grafico 1: Curva di valore assoluto
            plt.subplot(2, 1, 1)
            plt.plot(risultati['anni'], risultati['valori'], 'b-o', linewidth=2)
            plt.title(f'Curva di Deprezzamento - Golf GTD {anno}', fontsize=14)
            plt.xlabel('Anno', fontsize=12)
            plt.ylabel('Valore Stimato (€)', fontsize=12)
            plt.grid(True, linestyle='--', alpha=0.7)
            plt.xticks(risultati['anni'])
            
            # Aggiungi etichette di valore sui punti
            for i, (x, y) in enumerate(zip(risultati['anni'], risultati['valori'])):
                plt.annotate(f"€{y:,.0f}", (x, y), textcoords="offset points", 
                            xytext=(0,10), ha='center', fontsize=9)
            
            # Grafico 2: Perdita annua in percentuale
            plt.subplot(2, 1, 2)
            x = risultati['anni'][1:]  # Anni (escluso il primo)
            if len(risultati['perdite_percentuali']) > 0:
                plt.bar(x, risultati['perdite_percentuali'], color='red', alpha=0.7)
                plt.title(f'Perdita di Valore Annua (%)', fontsize=14)
                plt.xlabel('Anno', fontsize=12)
                plt.ylabel('Perdita Annua (%)', fontsize=12)
                plt.grid(True, linestyle='--', alpha=0.7, axis='y')
                plt.xticks(x)
                
                # Aggiungi etichette di valore sulle barre
                for i, (x_val, y_val) in enumerate(zip(x, risultati['perdite_percentuali'])):
                    plt.annotate(f"{y_val:.1f}%", (x_val, y_val), textcoords="offset points", 
                                xytext=(0,5), ha='center', fontsize=9)
            
            plt.tight_layout()
            plt.show()
            
            # Analizza quando la perdita annua scende sotto soglie significative
            if len(risultati['perdite_percentuali']) > 1:
                # Identifica quando la perdita annua scende sotto soglie significative
                soglie = [8, 5, 3]
                anni_soglie = {}
                
                for soglia in soglie:
                    for i, perdita in enumerate(risultati['perdite_percentuali']):
                        if perdita < soglia:
                            anni_soglie[soglia] = risultati['anni'][i+1]  # +1 perché il primo anno è quello corrente
                            break
                
                print(f"\n💡 ANALISI DELLA CURVA DI DEPREZZAMENTO:")
                print(f"==========================")
                
                # Mostra quando la perdita percentuale scende sotto le soglie
                for soglia in soglie:
                    if soglia in anni_soglie:
                        print(f"La perdita annua scende sotto il {soglia}% nell'anno {anni_soglie[soglia]}")
                
                # Trova l'anno con il maggior rallentamento della curva
                if len(risultati['perdite_percentuali']) >= 2:
                    differenze = [risultati['perdite_percentuali'][i] - risultati['perdite_percentuali'][i+1] 
                                for i in range(len(risultati['perdite_percentuali'])-1)]
                    
                    if differenze:
                        indice_max_diff = differenze.index(max(differenze))
                        anno_rallentamento = risultati['anni'][indice_max_diff + 2]  # +2 perché perdite_percentuali parte dal secondo anno
                        
                        print(f"\nPunto di maggior rallentamento della svalutazione: anno {anno_rallentamento}")
                        print(f"In questo punto, la perdita annua passa da {risultati['perdite_percentuali'][indice_max_diff]:.1f}% a {risultati['perdite_percentuali'][indice_max_diff+1]:.1f}%")
                        print(f"Differenza: {differenze[indice_max_diff]:.1f} punti percentuali")
                
                # Suggerimento strategico
                print(f"\n📌 SUGGERIMENTO STRATEGICO PER LA VENDITA:")
                print(f"==========================")
                
                if 5 in anni_soglie:
                    print(f"Punto di equilibrio tra svalutazione e utilizzo: anno {anni_soglie[5]}")
                    print(f"A partire da quest'anno, l'auto perde meno del 5% di valore all'anno.")
                    print(f"Questo rappresenta spesso un buon compromesso tra la perdita di valore")
                    print(f"e la necessità di sostenere costi di manutenzione crescenti per auto più vecchie.")
                elif 8 in anni_soglie:
                    print(f"La svalutazione scende sotto l'8% nell'anno {anni_soglie[8]}, ma rimane significativa.")
                    print(f"Se prevedi di tenere l'auto a lungo, considera questo periodo.")
                else:
                    print(f"La svalutazione rimane elevata per tutto il periodo analizzato.")
                    print(f"Questo suggerisce che l'auto potrebbe avere un tasso di deprezzamento sostenuto.")
                    print(f"Valuta se vendere prima o rivolgiti ad un esperto per un'analisi più approfondita.")
                
                # Suggerimento finale
                perdita_primo_anno = risultati['perdite_percentuali'][0]
                perdita_ultimo_anno = risultati['perdite_percentuali'][-1]
                differenza = perdita_primo_anno - perdita_ultimo_anno
                
                if differenza > 5:
                    print(f"\nL'auto mostra una classica curva di deprezzamento con una pendenza che")
                    print(f"si riduce significativamente nel tempo (da {perdita_primo_anno:.1f}% a {perdita_ultimo_anno:.1f}%).")
                    if perdita_ultimo_anno < 5:
                        print(f"Suggerimento: Considera di tenere l'auto fino a quando la perdita annua")
                        print(f"scende sotto il 5%, che nel tuo caso è l'anno {anni_soglie.get(5, 'oltre il periodo analizzato')}.")
                else:
                    print(f"\nLa curva di deprezzamento mostra un andamento relativamente costante.")
                    print(f"Questo potrebbe dipendere dalle caratteristiche specifiche del modello o del mercato.")
                    print(f"In questi casi, altri fattori come costi di manutenzione o esigenze personali")
                    print(f"dovrebbero guidare la decisione sul momento di vendita.")
            else:
                print(f"\nPeriodo di previsione troppo breve per un'analisi dettagliata della curva di deprezzamento.")
    
    # Collega la funzione al bottone
    bottone_calcola.on_click(on_calcola_button_click)
    
    # Visualizza l'interfaccia
    display(form)
    
    return form

# Crea l'interfaccia e visualizzala
print("\n--- SIMULATORE INTERATTIVO CON CURVA DI DEPREZZAMENTO REALISTICO ---")
print("Utilizza i controlli qui sotto per simulare la svalutazione futura della tua Golf GTD")
interfaccia_previsione()