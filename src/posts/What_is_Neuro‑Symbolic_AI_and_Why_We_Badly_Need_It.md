# What Is Neuro‑Symbolic AI?

## Neuro‑Symbolic AI is an approach that integrates two historically separate AI paradigms:

*Neural (connectionist) AI — deep learning and other statistical learning methods adept at pattern recognition from unstructured data.

*Symbolic AI — logic-based, rule-driven systems built around explicit knowledge representations, reasoning, and explainability. 

Neuro‑Symbolic AI aims to combine these complementary strengths into a hybrid architecture that can both learn from data and reason using explicit knowledge. It addresses limitations in each: neural networks often lack interpretability, consistency guarantees, and long-term reasoning; symbolic systems struggle with perception and pattern recognition in noisy real‑world data. 

Philosophically, this dual-process aligns with Kahneman’s System 1 (fast and intuitive) and System 2 (slow, deliberative) thinking framework. Neural nets mirror System 1; symbolic reasoning mirrors System 2. True AI requires both. 

### Common neuro‑symbolic frameworks include:

*Logic Tensor Networks: encode logical rules as differentiable constraints in neural architectures.

*DeepProbLog: combines neural perception (e.g., image classifiers) with probabilistic symbolic reasoning. 

*Systems that embed knowledge graphs and ontologies alongside learned models. 

### Why Do We Badly Need Neuro‑Symbolic AI?

1. Explainability, Trust, and Safety
Black‑box models (e.g., LLMs) can hallucinate or fail unpredictably. Symbolic reasoning affords logical traceability. Combining both lets AI provide user-level explanations, better uncertainty handling, and safety guarantees needed in high-stakes domains like healthcare, security, and law. 

The CREST framework (Consistency, Reliability, Explainability, Safety, Trustworthy) specifically argues that neuro‑symbolic methods are vital for trustworthy AI, particularly in LLM‑driven systems. 

2. Abstract Reasoning & Analogical Generalization
Tasks such as analogical reasoning, abstraction, and long-term planning require structured knowledge that purely statistical models often cannot handle. Neuro‑Symbolic AI formalizes and manipulates symbolic content to support these capabilities. 

A recent study on pragmatic analogy highlights that LLMs fail at higher‑level analogies unless augmented by symbolic structures to guide mapping and interpretation. 

3. Solving Real‑World Integration Challenges
Use cases like cyber‑defense, additive manufacturing, and healthcare benefit enormously from neuro‑symbolic approaches:

-Cybersecurity: combining neural detection of anomalies with rule‑based reasoning about attack chains improves detection and response. Proof-of-concept work demonstrates feasibility. 

-Additive manufacturing: a neurosymbolic algorithm combining neural‐network feature extraction with decision‑tree logic outperformed pure ANN models in predicting material strength. 
Communications of the ACM

-Medical emergencies: integrating real-time signals, structured patient data, and symbolic rule reasoning enhances the reliability of critical decision-making. 
European Data Protection Supervisor

4. Bridging Perception and Cognition
AI today generally excels at perception (vision, speech, language) but struggles in cognition—reasoning, planning, knowledge representation. Neuro‑symbolic AI explicitly bridges these layers, supporting multi-modal reasoning and knowledge-driven cognition. 

5. Advancing Toward Robust, General AI
Leading researchers argue that general artificial intelligence requires not just neural feature-learning, but also symbolic reasoning, abstraction, and structured knowledge. The hybrid architecture is seen as a prerequisite for next-level AI. 

Gary Marcus succinctly put it: “We cannot construct rich cognitive models in an adequate, automated way without hybrid architecture, rich prior knowledge, and sophisticated techniques for reasoning.” 

### How Neuro‑Symbolic AI Actually Works (Techniques & Architectures)
Here’s a non-exhaustive overview of methods:

*Symbol representations embedded in neural networks (neural → symbolic): e.g., neural models extract symbols which symbolic logic then manipulates.

*Symbolic → neural pipelines: use logic or rule systems to generate or label training data that neural models learn from.

*Jointly integrated architectures like Logic Tensor Networks and DeepProbLog, where classical logical formulas and neural feature learning co-exist. 

Taxonomies proposed by Henry Kautz categorize these integration styles from purely modular (pipeline) to deeply integrated. 

### A Call for Action: Why We Should Invest in Neuro‑Symbolic AI Now
*To Build Trustworthy AI
As AI pervades critical sectors, mere accuracy is insufficient. Systems must be explainable, verifiable, and safe — especially as black‑box LLMs become widespread. Neuro‑symbolic frameworks like CREST provide principled ways to meet these needs. 

*To Enable Commonsense Reasoning & Planning
Current AI fails often on tasks requiring common sense, long-term planning, or abstract reasoning. Symbolic reasoning helps fill these gaps—especially when integrated with perceptual neural models. 

*To Improve Domain‑Specific Decision‑Making
Domains such as law, medicine, robotics, finance, and cybersecurity require both learning and exact compliance with rules and logic. Neuro‑symbolic systems can combine domain knowledge with data‑driven adaptability. 

*To Achieve Generalization & Abstraction
Human‑like reasoning relies on abstraction, analogy, and reuse of concepts. Pure neural nets struggle here. Symbolic modules supply the abstraction necessary to generalize beyond training examples. 

Neuro‑Symbolic AI represents the most promising path forward for building AI systems that are:

-Learning‑capable (neural)

-Reasonable, transparent, and verifiable (symbolic)

-Safe, trustworthy, and abstractly capable

AI’s next wave depends on this hybrid synthesis—not as an incremental improvement, but as a foundational integration. We badly need it to meet the demands of high‑stakes applications, human‑aligned reasoning, and trustworthy intelligent systems.

### References
“Neuro‑symbolic AI” — integrated historical overview and taxonomy - turing.ac.uk

“Why We Need Neuro-Symbolic AI” (Forbes, 2025)


# DeepProbLog Tutorial: Adding Two MNIST Digits

This tutorial shows how to combine neural perception and symbolic logic using **DeepProbLog**. We’ll create a program that classifies two MNIST digit images and reasons symbolically to predict their sum.

---

## Step 1: Install Dependencies

```bash
pip install deepproblog torch torchvision
```
Make sure you have:
```bash
Python ≥ 3.9

deepproblog (includes ProbLog, PySDD)

PyTorch & TorchVision 
```

## Step 2: Define a Neural Predicate in Python
```bash
from deepproblog.network import Network
import torch.nn as nn
import torchvision.transforms as transforms

class DigitNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(1, 16, 5), nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(16, 32, 5), nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.fc = nn.Sequential(
            nn.Linear(32*4*4, 128), nn.ReLU(),
            nn.Linear(128, 10)
        )

    def forward(self, x):
        h = self.conv(x)
        h = h.view(h.size(0), -1)
        return self.fc(h)

digit_net = DigitNet()
net = Network(digit_net, "digit", batching=True, optimizer="Adam")
```
Network wraps the CNN as a neural predicate named digit.

It outputs a probability distribution over digits 0–9.

### Step 3: Write the DeepProbLog Logic Program
Create a .pl file (addition.pl):

```bash
nn(digit, [Image], Digit).

addition(Image1, Image2, Sum) :-
    digit(Image1, D1),
    digit(Image2, D2),
    Sum is D1 + D2.
nn(digit, [Image], Digit) declares digit/2 as a neural predicate.
```
The addition/3 rule symbolically sums the two recognized digits.

### Step 4: Training & Inference Code
```bash
from deepproblog.model import Model
from deepproblog.dataset import Dataset
from torchvision.datasets import MNIST
from torchvision.transforms import ToTensor
```

#### Build DeepProbLog model
```bash
model = Model("addition.pl", [net])

# Prepare data: pairs of MNIST digits
train = Dataset([
    ({"Image1": img1, "Image2": img2}, {"addition": sum_label})
    for (img1, _), (img2, _) in paired_mnist_loader("train")
])

model.set_dataset(train)
model.train(epochs=10)
```

#### Inference on a test pair
```bash
query = model.solve([{"Image1": test_img1, "Image2": test_img2}], start=0, n=1)
print("Predicted sum probabilities:", query[0].get_facts("addition"))
paired_mnist_loader yields two images and their true sum for training.
```
Training uses only the sum supervision, not individual digit labels.

Backpropagation jointly adjusts the CNN so that its digit probability outputs support correct sums 


#### What’s Happening Under the Hood?
Each CNN outputs P(digit = d | image) distributions for two images.

Logic enumerates joint possibilities D1 + D2 = Sum, computing probabilities like:

```bash
P(sum = s) = Σ_{d1 + d2 = s} P1[d1] * P2[d2]
```
If the model assigns low probability to the correct sum, the error is propagated back to the neural predicate weights, nudging digit predictions toward those that satisfy the logic.

This is end‑to‑end neuro‑symbolic differentiable training 

### Step 5: Evaluate & Compare
You can compare with a conventional CNN:

A standard SumNet that concatenates both MNIST images and directly predicts the sum class.

Train with same data but sum labels only.DeepProbLog outperforms when generalizing to unseen combinations (e.g. novel digit pairs), thanks to the symbolic addition rule. It combines neural perception (recognizing noisy digit images) with symbolic reasoning (exact addition).

The model handles uncertainty and ambiguity well, via probabilistic joint inference and logical constraints.

Training only needs high‐level labels (sums), not per-digit annotations.

This architecture showcases key strengths of neuro‑symbolic AI: compositional generalization, interpretability, and efficient learning from weaker supervision 


#### You now have a working neuro‑symbolic pipeline: perceptual input → neural distribution → symbolic rule → final answer. 