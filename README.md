# Soma

Sistema para centralizar o controle financeiro pessoal, oferecendo visibilidade clara sobre entradas, saídas, saldos bancários e compromissos futuros (faturas, recorrências, limites), permitindo decisões financeiras mais informadas.

> ⚠️ **Status:** Em planejamento inicial. Este README será atualizado conforme o projeto evolui.

---

## Índice

- [Objetivo](#objetivo)
- [Estrutura do Monorepo](#estrutura-do-monorepo)
- [Módulos do Sistema](#módulos-do-sistema)
- [Modelagem de Dados](#modelagem-de-dados)
- [Stack Técnica](#stack-técnica)
- [Roadmap](#roadmap)
- [Pontos de Atenção](#pontos-de-atenção)
- [Como Contribuir](#como-contribuir)

---

## Objetivo

Otimizar o controle de:
- Entradas e saídas financeiras
- Lançamentos recorrentes (contas fixas, assinaturas, etc.)
- Saldos bancários (múltiplas contas)
- Limites e faturas de cartões de crédito
- Orçamentos por categoria
- Projeções e relatórios financeiros

---

## Estrutura do Monorepo

```
.
├── apps/
│   ├── api/              # Backend (API REST)
│   └── web/               # Frontend (SPA / Dashboard)
├── packages/
│   ├── shared/             # Tipos, utils e regras de negócio compartilhadas
│   └── ui/                  # Componentes de UI reutilizáveis
├── docs/                   # Documentação técnica e de produto
└── README.md
```

> Estrutura sujeita a ajustes conforme as ferramentas de build/monorepo escolhidas (ex: Turborepo, Nx, pnpm workspaces).

---

## Módulos do Sistema

### 1. Contas e Saldos Bancários
- Cadastro de múltiplas contas (corrente, poupança, carteira digital, dinheiro físico)
- Saldo atual por conta + saldo consolidado geral
- Histórico de saldo ao longo do tempo
- Reconciliação manual de saldo

### 2. Lançamentos (Entradas e Saídas)
- Cadastro de transação: valor, data, categoria, conta, descrição, tags
- Tipos: receita, despesa, transferência entre contas
- Status: previsto (a pagar/receber) vs. efetivado
- Categorização hierárquica (categoria > subcategoria)
- Anexos de comprovantes (opcional)

### 3. Lançamentos Recorrentes
- Frequência configurável: diária, semanal, mensal, anual
- Geração automática de lançamentos futuros previstos
- Edição em lote (uma ocorrência vs. todas as futuras)
- Alertas de vencimento próximo

### 4. Cartões de Crédito
- Cadastro de cartão: limite, dia de fechamento, dia de vencimento, conta vinculada
- Cálculo automático de fatura por ciclo de fechamento
- Limite disponível em tempo real
- Parcelamento automático de compras
- Status da fatura: aberta, fechada, paga, atrasada

### 5. Orçamento e Limites
- Teto de gastos por categoria/mês
- Comparativo orçado vs. realizado
- Alertas de limite próximo/ultrapassado

### 6. Relatórios e Dashboard
- Fluxo de caixa por período
- Distribuição de gastos por categoria
- Projeção de saldo futuro
- Comparativos mês a mês / ano a ano

### 7. Metas Financeiras (fase futura)
- Metas de economia (ex: reserva de emergência)
- Acompanhamento de progresso

---

## Modelagem de Dados

Entidades principais (sujeitas a refinamento):

| Entidade | Principais campos |
|---|---|
| **Usuário** | id, nome, email, senha_hash |
| **Conta** | id, usuario_id, nome, tipo, saldo_inicial, saldo_atual |
| **Cartão** | id, conta_id, nome, limite, dia_fechamento, dia_vencimento |
| **Fatura** | id, cartao_id, mes_referencia, valor_total, status, data_vencimento |
| **Categoria** | id, nome, tipo (receita/despesa), categoria_pai_id |
| **Lançamento** | id, conta_id/cartao_id, categoria_id, valor, data, tipo, status, recorrencia_id, fatura_id |
| **Recorrência** | id, frequência, data_inicio, data_fim, dia_referencia |
| **Orçamento** | id, categoria_id, mes_referencia, valor_limite |

**Relações-chave:**
- Um cartão pertence a uma conta (débito automático da fatura)
- Uma fatura agrupa N lançamentos de um cartão em um ciclo
- Um lançamento recorrente "molde" gera N lançamentos filhos

---

## Stack Técnica

> Definição inicial sugerida — ajustar conforme decisão do time.

- **Backend:** API REST (Node.js/NestJS ou Python/FastAPI)
- **Banco de dados:** PostgreSQL
- **Frontend:** SPA (React/Vue), responsivo
- **Autenticação:** JWT + 2FA
- **Jobs agendados:** geração de recorrências, fechamento de faturas, alertas

---

## Roadmap

- [ ] **Fase 1 — MVP:** contas, categorias, lançamentos manuais, saldo consolidado, dashboard básico
- [ ] **Fase 2 — Recorrências e Cartões:** lançamentos recorrentes, cadastro de cartões, cálculo de fatura/limite
- [ ] **Fase 3 — Orçamento e Relatórios:** limites por categoria, relatórios comparativos, projeção de saldo
- [ ] **Fase 4 — Refinamentos:** metas financeiras, anexos, exportação (CSV/PDF), integração bancária (Open Finance)

---

## Pontos de Atenção

- **Cálculo de fatura de cartão:** compras após o fechamento devem entrar na fatura seguinte, não na atual.
- **Lançamentos previstos vs. efetivados:** evita que o saldo exibido fique incorreto antes da data real de pagamento/recebimento.
- **Segurança de dados financeiros:** criptografia em repouso e cuidado redobrado caso haja integração bancária futura (Open Finance).

---

## Como Contribuir

1. Clone o repositório
2. Instale as dependências (`README` de cada app terá instruções específicas)
3. Crie uma branch a partir de `main`: `git checkout -b feature/nome-da-feature`
4. Abra um Pull Request descrevendo a mudança

---

## Licença

Definir licença do projeto.
