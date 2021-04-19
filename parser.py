# Import summarize from gensim
from gensim.summarization.summarizer import summarize
from gensim.summarization import keywords# Import the library
from pdfminer.high_level import extract_text
# to convert MSword doc to txt for processing.
import docx2txt

# resume = docx2txt.process("Week_4_Assessment.pdf")

resume = extract_text("resume.pdf")
text_resume = str(resume)#Summarize the text with ratio 0.1 (10% of the total words.)
summarized_resume = summarize(text_resume, ratio=0.1)
print(summarized_resume)

